console.log("js linked");
$(document).ready(() => {
  let unicorns = [];
  const $unicornTarget = $(".unicorn-holder")
  const locations = ["barn", "pasture", "trails"];
  $unicornTarget.on("change", ".unicorn-location-picker", function(e) {
    let unicornId = $(e.target).data("unicorn-id");
    $.ajax({
      method: "PUT",
      url: `/api/unicorns/${unicornId}`,
      data: {location: e.target.value},
      success: function(returnedUnicorn) {
        unicorns = unicorns.filter(x => x.id != unicornId)
        unicorns.push(returnedUnicorn)
        rerender()
      }
    })
  })

  function getData() {
    $.ajax({
      method: "GET",
      url: "/api/unicorns",
      success: function(results) {
        unicorns = results;
        rerender();
      }
    })
  }
  let {thing1, thing2} = {}
  function rerender() {
    unicorns = unicorns.sort((a,b) => a.name > b.name)
    $unicornTarget.empty()
    $unicornTarget.append(unicorns.map(getUnicornHtml));
  }

  function getUnicornHtml(unicorn) {
    return `
      <div class="row" style="background-color: ${unicorn.coloring}">
        <div class="col-3">
          ${unicorn.name}
        </div>
        <div class="col-3">
          ${getSelect(unicorn.location, unicorn.id)}
        </div>
        <div class="col-3">
          ${unicorn.coloring}
        </div>
        <div class="col-3">
          ${unicorn.food}
        </div>
      </div>
    `;
  }

  // passed location is selected
  function getSelect(location, id) {
    let options = locations.map(x => {
      return `<option ${x == location ? "selected" : ""}>${x}</option>`
    })
    return `
      <select data-unicorn-id=${id} class="unicorn-location-picker">
        ${options.join("")}
      </select>
    `
  }

  getData();
});
