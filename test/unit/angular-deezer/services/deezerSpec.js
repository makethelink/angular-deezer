describe('googlePlus Module specs', function () {

    var deezer, deezerProvider, $window, $timeout;

    beforeEach(function () {
        module('angularDeezer', function (_DeezerProvider_) {
            deezerProvider = _DeezerProvider_;
            //GooglePlusProvider.init({
            //    apiKey: 'daowpdmpomwa21o3no1in'
            //});
        });

        inject(function (_$window_, _Deezer_, _$timeout_) {
            $window = _$window_;
            deezer = _Deezer_;
            $timeout = _$timeout_;
        });
    });

    it('provider should exist', function () {
        expect(deezerProvider).to.be.defined;
    });
    //
    //describe('the provider api should provide', function () {
    //
    //    it("a working login", inject(function () {
    //
    //        GooglePlusProvider.enableServerSide();
    //        GooglePlusProvider.disableServerSide();
    //
    //        expect(googlePlus.login().then).toEqual(jasmine.any(Function));
    //
    //        expect(window.gapi.auth.authorize).toHaveBeenCalledWith({
    //            client_id: GooglePlusProvider.getClientId(),
    //            scope: GooglePlusProvider.getScopes(),
    //            immediate: false,
    //        }, googlePlus.handleAuthResult);
    //    }));
    //
    //    it("a working login with server-side enabled", inject(function () {
    //
    //        GooglePlusProvider.enableServerSide();
    //
    //        expect(googlePlus.login().then).toEqual(jasmine.any(Function));
    //
    //        expect(window.gapi.auth.authorize).toHaveBeenCalledWith({
    //            client_id: GooglePlusProvider.getClientId(),
    //            scope: GooglePlusProvider.getScopes(),
    //            immediate: false,
    //            access_type: 'offline',
    //            response_type: 'code token id_token gsession'
    //        }, googlePlus.handleAuthResult);
    //    }));
    //
    //    it("a working logout", inject(function () {
    //        expect(googlePlus.logout());
    //        expect(window.gapi.auth.signOut).toHaveBeenCalled();
    //    }));
    //
    //    it('appId as default value', function () {
    //        expect(GooglePlusProvider.getClientId()).toBe(null);
    //    });
    //
    //    it('working getter / setter for appId', function () {
    //        GooglePlusProvider.setClientId('123456789101112');
    //        expect(GooglePlusProvider.getClientId()).toBe('123456789101112');
    //    });
    //
    //    it('locale as default value', function () {
    //        expect(GooglePlusProvider.getApiKey()).toBe('daowpdmpomwa21o3no1in');
    //    });
    //
    //    it('working getter / setter for locale', function () {
    //        GooglePlusProvider.setApiKey('g4ilu32b42iub34piu32b4liu23b4i23');
    //        expect(GooglePlusProvider.getApiKey()).toBe('g4ilu32b42iub34piu32b4liu23b4i23');
    //    });
    //
    //    it('status as default value', function () {
    //        expect(GooglePlusProvider.getScopes()).toBe('https://www.googleapis.com/auth/plus.login');
    //    });
    //
    //    it('working getter / setter for status', function () {
    //        GooglePlusProvider.setScopes('https://www.googleapis.com/auth/plus.me');
    //        expect(GooglePlusProvider.getScopes()).toBe('https://www.googleapis.com/auth/plus.me');
    //    });
    //});
});