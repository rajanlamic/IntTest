define(["app"], function (app) {
    'use strict';
    app.factory("userModel", function ($resource) {
        var storage = {
            username: '',
            userIdHash: '',
            sessionId:''
        }

        function setCurrentUser(username) {
            storage.username = username;
        }
        function setUserIdHash(hash) {
            storage.userIdHash = hash;
        }
        function setSession(Id) {
            storage.sessionId = Id;
        }
        
        function getSession(Id) {
            return storage.sessionId;
        }
        
        function getUserIdHash() {
            return storage.userIdHash;
        }
        function getCurrentUser() {
            return storage.username;
        }

        return {
            setCurrentUser: setCurrentUser,
            getCurrentUser:getCurrentUser,
            setUserIdHash: setUserIdHash,
            getUserIdHash:getUserIdHash,
            setSession:setSession,
            getSession:getSession
        }
    });
});