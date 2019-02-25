$(document).ready(function(){

  var bingo_data = [
    {
      "presenter_name": "Julia Bliss",
      "article_title": "QA 101",
      "state": "selected"
    },
    {
      "presenter_name": "Dave Laskowski",
      "article_title": "Dev 101",
      "state": "selected"
    },
  ]

  // should have a length of 25
  var card_data = [
    "Julia Bliss",
    "Dev 101",
    "Gartner 210923",
    "Dave Laskowski",
    "Gartner 123824",
    "Gartner 103928",
    "Gartner 192332"
  ];

  // populate bingo board with card card_data
  for (var i=0; i<5; i++) {
    var row = $("<tr>").addClass("bingo-row");
    $("#bingo-board").append(row);
    for (var j=0; j<5; j++) {
      let card_data_index = i*5 + j;
      var content = $("<p>").html(card_data[card_data_index]);
      var cell = $("<td>").append(content).addClass("bingo-card");
      row.append(cell);
    }
  }

  $(".bingo-card").click(function(){
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      $(this).css("background-color", "white");
    }
    else {
      $(this).addClass("selected");
      var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                 (25 + 70 * Math.random()) + '%,' +
                 (85 + 10 * Math.random()) + '%)';
      $(this).css("background-color", cssHSL);
    }
  });
});
