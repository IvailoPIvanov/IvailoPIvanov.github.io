//prettyPhoto  after the page has finished loading
$(document).ready(function () {
    $('a[data-gal]').each(function () {
        $(this).attr('rel', $(this).data('gal'));
    });
    $("a[data-gal^='prettyPhoto']").prettyPhoto({ animationSpeed: 'slow', theme: 'facebook', slideshow: false, overlay_gallery: true, social_tools: false, deeplinking: false });
});

// Script for navigation
$(function () {
    // grab the initial top offset of the navigation 
    var sticky_navigation_offset_top = $('#sticky-navigation').offset().top;

    // the function that decides weather the navigation bar should have "fixed" css position or not.
    var sticky_navigation = function () {
        var scroll_top = $(window).scrollTop(); // our current vertical position from the top

        // if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
        if (scroll_top > sticky_navigation_offset_top) {
            $('#sticky-navigation').addClass('fixed');
        } else {
            $('#sticky-navigation').removeClass('fixed');
        }
    };

    // run our function on load
    sticky_navigation();

    // and run it again every time you scroll
    $(window).scroll(function () {
        sticky_navigation();
    });

});

//Add slow scrolling speed
$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = this.hash,
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 500, 'swing', function () {
        window.location.hash = target;
    });
});

//Mobile responsive navigation
/*! http://tinynav.viljamis.com v1.03 by @viljamis */
(function (a, i, g) {
    a.fn.tinyNav = function (j) {
        var c = a.extend({ active: "selected", header: !1 }, j); return this.each(function () {
            g++; var h = a(this), d = "tinynav" + g, e = ".l_" + d, b = a("<select/>").addClass("tinynav " + d); if (h.is("ul,ol")) {
                c.header && b.append(a("<option/>").text("Navigation")); var f = ""; h.addClass("l_" + d).find("a").each(function () { f += '<option value="' + a(this).attr("href") + '">' + a(this).text() + "</option>" }); b.append(f); c.header || b.find(":eq(" + a(e + " li").index(a(e + " li." + c.active)) + ")").attr("selected", !0);
                b.change(function () { i.location.href = a(this).val() }); a(e).after(b)
            }
        })
    }
})(jQuery, this, 0);

$(function () {
    $("#nav").tinyNav({
        active: 'selected', // Set the "active" class
        header: false // Show header instead of the active item
    });
});


//End of script for navigation
//Conatact Form
$(document).ready(function () {
    $('#send_message').click(function (e) {
        e.preventDefault();
        var error = false;
        var topic = $('#topic').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        //Topic
        if (topic.length == 0) {
            var error = true;
            $('#topic_error').fadeIn(500);
        } else {
            $('#topic_error').fadeOut(500);
        }
        //Name
        if (name.length <= 2 ) {
            var error = true;
            $('#name_error').fadeIn(500);
        } else {
            $('#name_error').fadeOut(500);
        }
        //Email
        if (email.length <= 7 || email.indexOf('@') == '-1') {
            var error = true;
            $('#email_error').fadeIn(500);
        } else {
            $('#email_error').fadeOut(500);
        }
        //Subject
        if (subject.length == 0) {
            var error = true;
            $('#subject_error').fadeIn(500);
        } else {
            $('#subject_error').fadeOut(500);
        }
        //Message
        if (message.length == 0) {
            var error = true;
            $('#message_error').fadeIn(500);
        } else {
            $('#message_error').fadeOut(500);
        }
        //Submiting
        if (error == false) {
            $('#send_message').attr({ 'disabled': 'true', 'value': 'Sending...' });
            $.post("send_email.php", $("#contact_form").serialize(), function (result) {
                if (result == 'sent') {
                    $('#cf_submit_p').remove();
                    $('#mail_success').fadeIn(500);
                } else {
                    $('#mail_fail').fadeIn(500);
                    $('#send_message').removeAttr('disabled').attr('value', 'Send Message');
                }
            });
        }
    });
});