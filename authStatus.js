
class AuthStatus {
    constructor() {
        this.status = null;
        this.NotStarted = "Not Started";
        this.InProgress = "In progress";
        this.Error = "Error";
        this.Valid = "Valid";

        this.status = this.NotStarted;
    }

    log()
    {
        console.log("AuthStatus: " + this.status);
    }

    changeToInProgress() {
        return this.status = this.InProgress;
    }

    changeToError() {
        return this.status = this.Error;
    }

    changeToValid() {
        return this.status = this.Valid;
    }

    isNotStarted() {
        this.update();
        return this.status == this.NotStarted;
    }

    isInProgress() {
        this.update();
        return this.status == this.InProgress;
    }

    isError() {
        this.update();
        return this.status == this.Error;
    }

    isValid() {
        this.update();
        return this.status == this.Valid;
    }

    update()
    {
        var isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();

        if (isSignedIn)
            this.changeToValid();
    }
}

var staticAuthStatus = new AuthStatus();