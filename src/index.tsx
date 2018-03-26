import * as Style from "assets/css/index.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
    public render() {
        return (
            <h1 className={Style.title}>console.info("Welcome Sun React");</h1>
        );
    }

}

ReactDOM.render(<App />, document.getElementById("App"));
