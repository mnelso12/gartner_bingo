let initial_bingo_data = [
	"Lily",
	"Josh",
	"Alex",
	"Zaid",
	"Kyle",
	"Claire",
	"Julia",
	"Joe",
	"Sam",
	"Heath",
	"Doug",
	"Robby",
	"Da'Veed",
	"Reeti",
	"Enterprise Architecture Program",
	"Machine Learning",
	"Fraud Detection",
	"Penetration Testing",
	"DevOps",
	"DevSecOps",
	"Empathic Services in Banking",
	"Mergers & Acquisitions",
	"Web Application Development",
	"DigitalOps",
	"Customer Impact",
	"Red Teaming",
	"Collaboration Suite Options",
	"Secure Development Life Cycle",
	"Human Interaction in Build Process",
	"Digital Banking",
	"Internet of Things",
	"Mobile Application Development",
	"Self-Driving Cars",
	"Blockchain",
	"Cryptocurrency",
	"Data Lakes",
	"Purdue University",
	"University of Illinois",
	"Indiana University",
	"Stanford University",
	"University of Georgia",
	"Trine University",
	"C1",
	"C2",
	"S1",
	"S2",
	"M",
	"SM",
	"AD",
	"D",
	"TC - Core",
	"TC - PSS",
	"TC - S&P",
	"TC - Cloud",
	"TC - D&A",
	"IAFA - IA Process",
	"IAFA - IT Audit",
	"BPI",
	"R&C",
	];


$(document).ready(function(){

  var grid_size = 5;

  function getSum(total, num) {
    return total + num;
  }

  function hash_email(email, total_bingo_data) {
    var ascii_digits = [];
    for (var i=0; i<email.length; i++) {
      let char = email[i];
      ascii_digits.push(char.charCodeAt(0));
    }

    // determine "random" values
    let sum_ascii_digits = ascii_digits.reduce(getSum);
    let offset1 = sum_ascii_digits%(grid_size*grid_size/2)+1;
    let offset2 = sum_ascii_digits%grid_size+1;
    let reverse1 = sum_ascii_digits%2;
    let reverse2 = sum_ascii_digits%2+1;
    let reverse3 = sum_ascii_digits%3; // WE NEED MORE SMALL PRIME NUMBERS!

    // scramble 1000 iterations
    for (var i=0; i<1000; i++) {
      total_bingo_data = scramble_array(total_bingo_data, sum_ascii_digits, offset1, offset2, reverse1, reverse2, reverse3);
    }
    return total_bingo_data;
  }

  function scramble_array(arr, sum_ascii_digits, offset1, offset2, reverse1, reverse2, reverse3) {
    // break into chunks
    chunk1 = arr.slice(0, offset1);
    chunk2 = arr.slice(offset1);

    // do reverse
    if (reverse1 == 0) {
      chunk1 = chunk1.reverse();
    }
    if (reverse2 == 0) {
      chunk2 = chunk2.reverse();
    }
    arr = chunk2.concat(chunk1);
    if (reverse3 == 0) {
      arr = arr.reverse();
    }

    chunk3 = arr.slice(0, offset2);
    chunk4 = arr.slice(offset2);

    // do reverse
    if (reverse1 == 0) {
      chunk3 = chunk3.reverse();
    }
    if (reverse2 == 0) {
      chunk4 = chunk4.reverse();
    }
    arr = chunk4.concat(chunk3);
    if (reverse3 == 0) {
      arr = arr.reverse();
    }

    // remove unwanted indeces
    var i = 0;
    while (i<(arr.length-(grid_size*grid_size))) {
      if (i%2 == 0) {
        arr.splice(i, 1);
      }
      i++;
    }

    return arr;
  }

  $("#generate_bingo_board").click(function(){
    let email = $("#email_addr").val();
    var card_data = hash_email(email, initial_bingo_data);
    populate_board(card_data);
  });

  function populate_board(card_data) {
    // populate bingo board with card card_data
    $("#bingo-board").empty();
    for (var i=0; i<grid_size; i++) {
      var row = $("<tr>").addClass("bingo-row");
      $("#bingo-board").append(row);
      for (var j=0; j<grid_size; j++) {
        let card_data_index = i*grid_size + j;
        var content = $("<p>").html(card_data[card_data_index]);
        var cell = $("<td>").append(content).addClass("bingo-card");
        row.append(cell);
      }
    }

    $(".bingo-card").click(function() {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $(this).css("background-color", "white");
      }
      else {
        $(this).addClass("selected");
        var cssHSL = "hsl(" + 360 * Math.random() + ',' +
                   (85 + 10 * Math.random()) + '%,' +
                   (85 + 10 * Math.random()) + '%)';
        $(this).css("background-color", cssHSL);
      }
    });
  }

  $("#bingo-button").click(function(){
    var email = "madelyn.nelson@protiviti.com;lily.carmody@protiviti.com";
    var subject = 'BINGO! PSS Gartner Bingo LnL';
    var emailBody = 'BINGO!!! My email: ' + $("#email_addr").val();
    window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +   emailBody;
  });

});
