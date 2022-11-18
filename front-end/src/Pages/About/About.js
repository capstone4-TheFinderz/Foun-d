import React from "react";
import "./About.scss";
export default function About() {
  return (
    <div>
      <div>
        <h1 id="about-heading">Meet The Devs!</h1>
        <div>
          <h2 id="aboutus-heading">About Us:</h2>
          <p></p>
        </div>
        <div id="dev-div">
          <h4 id="name-headings">Candace Garvin</h4>
          <img
            scr="https://avatars.githubusercontent.com/u/98069665?v=4"
            alt="Candace"
          ></img>
          <h5 id="title-headings">Title: Jr. Software Engineer</h5>
          <a id="github-link" href="https://github.com/CandaceNia">
            {" "}
            Candace's Github
          </a>
          <p className="bioText">
            I am currently a Jr. Full Stack Software Developer. I am pursuing
            this field of work because I have a profound love for computers and
            their language. Some of my strengths are leadership and project
            management and I am an expert at time management. The next step I
            would like to take in my career is working for a big tech company so
            I can gain experience as well as work with other developers in the
            industry.
          </p>
        </div>
        <div id="dev-div">
          <h4 id="name-headings">Jan Matais</h4>
          <img
            scr="https://avatars.githubusercontent.com/u/98069665?v=4"
            alt="Jan"
          ></img>
          <h5 id="title-headings">Title: Jr. Software Engineer</h5>
          <a id="github-link" href="https://github.com/JC-MT">
            {" "}
            Jan's Github
          </a>
          <p className="bioText"></p>
        </div>
        <div id="dev-div">
          <h4 id="name-headings">Antonio Bowers</h4>
          <img
            scr="https://avatars.githubusercontent.com/u/98069665?v=4"
            alt="Antonio"
          ></img>
          <h5 id="title-headings">Title: Jr. Software Engineer</h5>
          <a id="github-link" href="https://github.com/gitlep1">
            {" "}
            Antonio's Github
          </a>
          <p className="bioText"></p>
        </div>
        <div id="dev-div">
          <h4 id="name-headings">Isaac Gonzalez</h4>
          <img
            scr="https://avatars.githubusercontent.com/u/98069665?v=4"
            alt="Isaac"
          ></img>
          <h5 id="title-headings">Title: Jr. Software Engineer</h5>
          <p className="bioText"></p>
        </div>
      </div>
    </div>
  );
}
