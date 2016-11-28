// TODO: convert to ES2016... use =>

$(document).ready(function () {
    function getQuote() {
        $.ajax({
            method: 'GET',
            url: "http://quotesondesign.com/wp-json/posts",
            data: {
                "filter[orderby]": "rand",
                "filter[posts_per_page]": 1
            },
            dataType: "json",
            cache: false,
            error: function (jqXHR, err) {
                console.log('Error');
            },
            success: function (data, status, jqXHR) {
                console.log('Success');
                console.log('status: ' + status);
                console.log('data:');
                console.dir(data);
                $('#quote').html(data[0].content 
                                    + '<p class="author">-'
                                    + data[0].title
                                    + '</p>');
            },
            complete: function (jqXHR, status) {
                console.log('complete');
                console.log('status: ' + status);
            },
        });
    }

    getQuote();
    $('#get-data').on('click', getQuote);
});