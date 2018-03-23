console.log("js linked");
$(document).ready(() => {
  let unicorns = [];
  const $unicornTarget = $(".unicorn-holder")

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
  function rerender() {
    $unicornTarget.empty()
    for(let unicorn of unicorns) {
      $unicornTarget.append(getUnicornHtml(unicorn))
    }
  }
  function getUnicornHtml(unicorn) {
    return `
      <div class="row">
        <div class="col-3">
          ${unicorn.name}
        </div>
        <div class="col-3">
          ${unicorn.location}
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
  getData();
});
