import React, { useState } from "react";
import { PickerOverlay } from "filestack-react";
import axios from "axios";
import Success from "./Success";
import Error from "./Error";

function Main() {
    // to check if the upload done with success or not
  const [uploadState, setUploadState] = useState(false);
  const [isPicked, setisPicked] = useState(false);
  // to check if submit button clicked or not
  const [isSubmited, setIsSubmited] = useState(false)
  // to check if the upload done with success or not
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const level = ["Your Level", "Engineer", "Bachelor"];
  const experince = ["0years", "1years", "2years", "3+years"];
  
  const [resumeName, setResumeName] = useState("");

  // Data to save 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [diploma, setDiploma] = useState("");
  const [levelSelected, setLevelSelected] = useState("");
  const [experienceSelected, setExperienceSelected] = useState("");
  const [designation, setDesignation] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  const handlePicker = () => {
    if (isPicked) {
      setisPicked(false);
    } else {
      setisPicked(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      diploma,
      levelSelected,
      experienceSelected,
      designation,
      resumeUrl,
    };
    // console.log(data)
    axios
      .post(
        "https://sheet.best/api/sheets/d58755ac-d06c-437b-a8d9-c0a62b8f408b",
        
        data
      )
      .then((res) => {setIsSubmited(true)
                setSubmitSuccess(true)
                setTimeout(()=>{
                    setFullName('')
                    setEmail('')
                    setDiploma('')
                    setLevelSelected('')
                    setExperienceSelected('')
                    setDesignation('')
                    setResumeUrl('')
                    setResumeName('')
                    setIsSubmited(false)
                    setSubmitSuccess(false)
                },1500)
            })
      .catch((error) => {
        setIsSubmited(true)
                setSubmitSuccess(false)
      });
  };
  return (
    <div className="app-main">
      <div className="container">
        <div className="input-row">
          <div className="input-theme">
            <input
              type="text"
              name="fullName"
              placeholder="your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-theme">
            <input
              type="email"
              name="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-theme">
            <input
              type="text"
              name="Diploma"
              placeholder="your diploma"
              value={diploma}
              onChange={(e) => setDiploma(e.target.value)}
            />
          </div>
          <div className="input-theme">
            <select
              name="level"
              value={levelSelected}
              onChange={(e) => setLevelSelected(e.target.value)}
            >
              {level.map((level_item) => {
                return <option value={level_item}>{level_item}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="input-row">
          <div className="input-theme">
            <select
              name="experience"
              value={experienceSelected}
              onChange={(e) => setExperienceSelected(e.target.value)}
            >
              {experince.map((exp_item) => {
                return (
                  <option value={exp_item.toString().charAt(0)}>
                    {exp_item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-theme">
            <input
              type="text"
              name="designation"
              placeholder="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="upload-button-box">
            <button
              className="main_button upload-button"
              onClick={handlePicker}
            >
              upload your resume
            </button>
          </div>
          {(resumeUrl || resumeName) && (
            <div
              className={
                uploadState
                  ? "Resume-State success-upload"
                  : "Resume-State error-upload"
              }
            >
              <p>{resumeName}</p>
            </div>
          )}
        </div>
        <div className="input-row">
          <div className="upload-button-box">
            <button
              className={"main_button submit-button "}
              onClick={handleSubmit}
            >
                {'Submit'}
            </button>
          </div>
          {isSubmited &&
          <div className="submit-state">
            {
                submitSuccess ? <Success/> : <Error/>
            }
          </div>
          }
        </div>
        {isPicked && (
          <PickerOverlay
            apikey={"AGTWenryhQHG02DDUx8Jaz"}
            onSuccess={(res) => {
              setisPicked(false);
              try {
                setResumeUrl(res.filesUploaded[0].url);
                setResumeName(res.filesUploaded[0].filename);
                setUploadState(true);
              } catch {
                setUploadState(false);
                setResumeName("wrong file format");
              }
            }}
            onUploadDone={(res) => console.log(res)}
            onError={(res) => {
              console.log(res);
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Main;
