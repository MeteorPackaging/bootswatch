Meteor.startup(function () {
  $("a[href='#']").click(function(e) {
    e.preventDefault();
  });
});
