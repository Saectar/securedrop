/**
 * The journalist page should degrade gracefully without Javascript. To avoid
 * confusing users, this function dyanamically adds elements that require JS.
 */
function enhance_ui() {
  // Add the "quick filter" box for sources
  $('div#filter-container').html('<input id="filter" type="text" placeholder="filter by codename" autofocus >');

  // Add the "select {all,none}" buttons
  $('div#select-container').html('<span id="select_all" class="select"><i class="fa fa-check-square-o"></i> select all</span> <span id="select_none" class="select"><i class="fa fa-square-o"></i> select none</span>');
}

$(function () {
  enhance_ui();

  var all = $("#select_all");
  var none = $("#select_none");

  all.css('cursor', 'pointer');
  none.css('cursor', 'pointer');

  all.click(function() {
    var checkboxes = $(":checkbox").filter(":visible");
    checkboxes.prop('checked', true);
  });
  none.click(function() {
    var checkboxes = $(":checkbox").filter(":visible");
    checkboxes.prop('checked', false);
  });

  $("#delete_collection").submit(function () {
    return confirm("Are you sure you want to delete this collection?");
  });

  $("#delete_collections").click(function () {
    var checked = $("ul#cols li :checkbox").filter(":visible").filter(function(index) {
        return $(this).prop('checked');
    });
    if (checked.length > 0) {
      return confirm("Are you sure you want to delete the " + checked.length + " selected collection" + (checked.length > 1 ? "s?" : "?"));
    }
    // Don't submit the form if no collections are selected
    return false;
  });

  $("#unread a").click(function(){
    $("#unread").html("unread: 0");
  });

  var filter_codenames = function(value){
    if(value == ""){
      $('ul#cols li').show()
    } else {
      $('ul#cols li').hide()
      $('ul#cols li[data-source-designation*="' + value.replace(/"/g, "").toLowerCase() + '"]').show()
    }
  }

  $('#filter').keyup(function(){ filter_codenames(this.value) })

  // Check if #filter exists by checking the .length of the jQuery selector
  // http://stackoverflow.com/questions/299802/how-do-you-check-if-a-selector-matches-something-in-jquery
  if ($('#filter').length) {
    filter_codenames($('#filter').val())
  }

  // Confirm before deleting user on admin page
  $('button.delete-user').click(function(event) {
      var username = $(this).attr('data-username');
      return confirm("Are you sure you want to delete the user " + username + "?");
  });

  // Confirm before resetting two factor authentication on edit user page
  $('form#reset-two-factor').submit(function(event) {
      return confirm("Are you sure to want to reset this user's two factor authentication?");
  });

});
