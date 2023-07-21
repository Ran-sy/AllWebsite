/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Mentor = ({ options, choose, setChoose }) => {
    const user = useSelector(state => state.user.value)
    console.log(user.token, 'user name: ', user.name)
    const [file, setFile] = useState(null);
    const [errors, setErros] = useState({
        expertise: false,
        company: false,
        experience: false,
        location: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleFocusInput = (e) => {
        const { name } = e.target;
        setErros((prev) => ({ ...prev, [name]: false }));
    };

    const handleBlurInput = (e) => {
        const { name } = e.target;
        setErros((prev) => ({
            ...prev,
            [name]: e.target.value.trim().length === 0,
        }));
    };

    const handleChange = (e) => {
        setChoose(e.target.value);
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <div className="page-content">
                <form className="content" onSubmit={handleSubmit}>
                    <div className="head">
                        <h2>Profile information</h2>
                        <p>Help us by answering questions to get you started</p>
                    </div>
                    <div className="row">
                        <div className=" col-sm-6">
                            <div className="p-3 draft ">
                                <h4 className="title">I'm looking for a</h4>
                                <div className="down-arrow">
                                    <BiSolidDownArrow />
                                </div>
                                <select
                                    className="data"
                                    placeholder="select type"
                                    value={choose}
                                    onChange={handleChange}
                                    style={{ background: "transparent" }}
                                >
                                    {options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-3 draft">
                                <h4 className="title">My designation is</h4>
                                <div className="down-arrow">
                                    <BiSolidDownArrow />
                                </div>

                                <select
                                    className="data"
                                    placeholder="select type"
                                    style={{ background: "transparent" }}
                                >
                                    <option className="choose1">Computer Science</option>
                                    <option className="choose1">Engineering</option>
                                    <option className="choose2">Artificial Intelligence</option>
                                    <option className="choose2">Computer programming</option>
                                </select>
                            </div>
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.expertise ? "input-error" : ""}`}
                                    name="expertise"
                                    type="text"
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    placeholder={errors.expertise ? "Input text" : "Expertise"}
                                />
                                {errors.expertise && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.company ? "input-error" : ""}`}
                                    name="company"
                                    type="text"
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    placeholder={
                                        errors.company ? "Input text" : "Current Company"
                                    }
                                />
                                {errors.company && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.experience ? "input-error" : ""}`}
                                    name="experience"
                                    type="text"
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    placeholder={
                                        errors.experience ? "Input text" : "Years of experience"
                                    }
                                />
                                {errors.experience && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                            <div className="p-3 draft">
                                <input
                                    className={`data ${errors.location ? "input-error" : ""}`}
                                    name="location"
                                    type="text"
                                    onFocus={handleFocusInput}
                                    onBlur={handleBlurInput}
                                    placeholder={errors.location ? "Input text" : "Location"}
                                />
                                {errors.location && (
                                    <div className="input-error-icon">
                                        <BiError />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="button1">
                                <label htmlFor="upload-file" type="button" className="upload">
                                    Upload resume
                                </label>
                                <input
                                    type="file"
                                    id="upload-file"
                                    accept=".pdf"
                                    onChange={selectFile}
                                />
                                <div className="d-flex justify-content-between">
                                    {file && (
                                        <>
                                            <p className="file-name">{file.name}</p>
                                            <button
                                                type="button"
                                                className="btn btn-sm text-sm-start text-danger"
                                                onClick={() => setFile(null)}
                                            >
                                                <GiCancel />
                                            </button>
                                        </>
                                    )}
                                </div>
                                <p className="explanation">
                                    Uploading your resume is not a must, but it helps those who
                                    are looking for specific qualification
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="button1 end  btn-1 ">
                                <Link to="/">
                                    <button type="button" className="submit">
                                        Submit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Mentor;
