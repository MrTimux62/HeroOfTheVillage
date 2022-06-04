let size_case = 200;
let size_map = 3000;
let left_base = parseFloat($("#center_origin").css("left"));
let top_base = parseFloat($("#center_origin").css("top"));
let player_pos_X = left_base;
let player_pos_Y = top_base;
let left_origin = left_base + size_case;
let top_origin = top_base - size_case;
let border_distance = size_case;
let direction = "bottom";
let case_difficulty = 1;
let max_shop = 1;
let max_boss = 1;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updatePlayer() {
    $(".player").css("background-position", "center -15px");

    setTimeout(() => {
        $(".player").animate({
            left: player_pos_X + "px",
            top: player_pos_Y + "px"
        }, 150);
    }, 150);

    setTimeout(() => {
        $(".player").css("background-position", "center 15px");
    }, 300);
    //$(".player").css("left", player_pos_X + "px");
    //$(".player").css("top", player_pos_Y + "px");
}

//////////////// SCROLL CONTROL /////////////////////

function focusPlayer() {
    if (parseFloat($(window).scrollTop()) > (parseFloat(player_pos_Y) - window.innerHeight / 2 - 5) && parseFloat($(window).scrollTop()) < (parseFloat(player_pos_Y) - window.innerHeight / 2 + 5)) {
        $(window).scrollLeft(parseFloat(player_pos_X) - window.innerWidth / 2);

    } else if (parseFloat($(window).scrollLeft()) > (parseFloat(player_pos_X) - window.innerWidth / 2 - 5) && parseFloat($(window).scrollLeft()) < (parseFloat(player_pos_X) - window.innerWidth / 2 + 5)) {
        $(window).scrollTop(parseFloat(player_pos_Y) - window.innerHeight / 2);

    } else {
        $(window).scrollTop(parseFloat(player_pos_Y) - window.innerHeight / 2);
        setTimeout(() => {
            $(window).scrollLeft(parseFloat(player_pos_X) - window.innerWidth / 2);
        }, 1000);
    }
    
}

$(window).resize(function () {
    focusPlayer();
});

$(document).ready(function () {
    focusPlayer();
});

//////////////////////////////////////////////////////

//////////////// CASE GENERATION /////////////////////

for (let index = 0; index < size_map; index++) {

    let move_parameters = "moveoff";

    if (parseFloat(left_origin) - parseFloat(player_pos_X) == 200 && parseFloat(top_origin) - parseFloat(player_pos_Y) == 0 ||
        parseFloat(left_origin) - parseFloat(player_pos_X) == -200 && parseFloat(top_origin) - parseFloat(player_pos_Y) == 0 ||
        parseFloat(top_origin) - parseFloat(player_pos_Y) == 200 && parseFloat(left_origin) - parseFloat(player_pos_X) == 0 ||
        parseFloat(top_origin) - parseFloat(player_pos_Y) == -200 && parseFloat(left_origin) - parseFloat(player_pos_X) == 0) {
        move_parameters = "moveon"
    }

    let random_nb = getRandomInt(100);
    let type_case;

    if (random_nb < 30) {
        if (max_shop <= 0) {
            type_case = "monster";
        } else {
            type_case = "shop";
            max_shop --;
        }
        
    } else if (random_nb < 70) {
        type_case = "monster";
    } else if (random_nb < 100) {
        if (max_boss <= 0) {
            type_case = "monster";
        } else {
            type_case = "boss";
            max_boss--;
        }
    }

    $("#GAME").append("<div id='case_" + index + "' class='case " + move_parameters + "' style='left:" + left_origin + "px; top:" + top_origin + "px;'><div id='center_case_" + index + " ' class='center_case discover-none type-" + type_case + " ' name='"+border_distance / 200+"'>?</div></div>");




    if (parseFloat(left_origin) == parseFloat(left_base) + parseFloat(border_distance) - size_case && parseFloat(top_origin) == top_base - border_distance) {
        border_distance = border_distance + size_case;
        case_difficulty++;
        top_origin = top_origin - size_case;
        left_origin = left_origin + size_case;
        direction = "right";
        max_boss = case_difficulty;
        max_shop = case_difficulty + 1;
    } else if (parseFloat(left_origin) == left_base + border_distance && parseFloat(top_origin) == top_base - border_distance) {
        direction = "bottom";
    } else if (parseFloat(left_origin) == left_base + border_distance && parseFloat(top_origin) == top_base + border_distance) {
        direction = "left";
    } else if (parseFloat(left_origin) == left_base - border_distance && parseFloat(top_origin) == top_base + border_distance) {
        direction = "top";
    } else if (parseFloat(left_origin) == left_base - border_distance && parseFloat(top_origin) == top_base - border_distance) {
        direction = "right";
    }

    switch (direction) {
        case "bottom":
            top_origin = parseFloat(top_origin) + size_case;
            break;
        case "left":
            left_origin = parseFloat(left_origin) - size_case;
            break;
        case "top":
            top_origin = parseFloat(top_origin) - size_case;
            break;
        case "right":
            left_origin = parseFloat(left_origin) + size_case;
            break;
        default:
            break;
    }
}

//////////////////////////////////////////////////////


//////////////// DEPLACEMENT /////////////////////

$(".case").click(function (e) {
    if ($(this).hasClass("moveon")) {
        player_pos_X = parseFloat($(this).css("left"));
        player_pos_Y = parseFloat($(this).css("top"));
        updatePlayer();
        focusPlayer();
        setTimeout(() => {
            if ($(this).find("div").hasClass("discover-none")) {
                $(this).find("div").removeClass("discover-none")
                if ($(this).find("div").hasClass("type-monster")) {
                    $(this).find("div").css("color", "orange")
                    $(this).find("div").html("Monstre Lv" + $(this).find("div").attr("name"))
                } else if ($(this).find("div").hasClass("type-shop")) {
                    $(this).find("div").css("color", "blue")
                    $(this).find("div").html("Shop Lv" + $(this).find("div").attr("name"))
                } else if ($(this).find("div").hasClass("type-boss")) {
                    $(this).find("div").css("color", "red")
                    $(this).find("div").html("Boss Lv" + $(this).find("div").attr("name"))
                }
                
            }
        }, 500);

        $(".case").each(function (index) {
            let move_parameters = "moveoff";

            if (parseFloat($(this).css("left")) - parseFloat(player_pos_X) == 200 && parseFloat($(this).css("top")) - parseFloat(player_pos_Y) == 0 ||
                parseFloat($(this).css("left")) - parseFloat(player_pos_X) == -200 && parseFloat($(this).css("top")) - parseFloat(player_pos_Y) == 0 ||
                parseFloat($(this).css("top")) - parseFloat(player_pos_Y) == 200 && parseFloat($(this).css("left")) - parseFloat(player_pos_X) == 0 ||
                parseFloat($(this).css("top")) - parseFloat(player_pos_Y) == -200 && parseFloat($(this).css("left")) - parseFloat(player_pos_X) == 0) {
                move_parameters = "moveon"
            }

            if (move_parameters == "moveon") {
                $(this).removeClass("moveoff");
                $(this).removeClass("moveon");
                $(this).addClass("moveon");
            } else {
                $(this).removeClass("moveoff");
                $(this).removeClass("moveon");
                $(this).addClass("moveoff");
            }
        });
    }




});

//////////////////////////////////////////////////////