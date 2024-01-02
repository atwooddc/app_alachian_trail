import React from "react";
import "./GitHubButton.css";

const GitHubButton = () => {
    const openGitHub = () => {
        window.open("https://github.com/atwooddc", "_blank");
    };
    return (
        <img
            alt="github-button"
            className="github-button"
            src={require("../img/dcalogo_transparent.png")}
            onClick={openGitHub}
        />
    );
};

export default GitHubButton;
