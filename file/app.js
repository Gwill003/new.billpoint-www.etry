(function () {
    var TRACK_URL = 'https://mxdiobene.nutritionology.shop/track.php';
    var offerLink = window.BINOM_OFFER || '{offer_link}';
    var clickId = window.BINOM_CLICKID || '{clickid}';
    var buttons = document.querySelectorAll('.amount');

    function withExit(url) {
        if (!url) {
            return url;
        }
        return url + (url.indexOf('?') === -1 ? '?' : '&') + 'exit=1';
    }

    function goToOffer(useExit) {
        if (document.body.dataset.leaving === '1') {
            return;
        }
        document.body.dataset.leaving = '1';
        buttons.forEach(function (button) {
            button.disabled = true;
        });
        window.location.href = useExit ? withExit(offerLink) : offerLink;
    }

    var params = new URLSearchParams(window.location.search);
    var fbclid = params.get('fbclid') || '';
    var pixel = TRACK_URL + '?pixel=1&sub1=' + encodeURIComponent(clickId);
    if (fbclid) {
        pixel += '&fbclid=' + encodeURIComponent(fbclid);
    }
    pixel += '&landing_url=' + encodeURIComponent(window.location.href);
    new Image().src = pixel;

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            goToOffer(false);
        });
    });

    if (window.history && window.history.pushState) {
        window.history.pushState({ landing: 1 }, '', window.location.href);
        window.addEventListener('popstate', function () {
            window.history.pushState({ landing: 1 }, '', window.location.href);
            goToOffer(true);
        });
    }
})();
