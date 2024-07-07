import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const server = "http://localhost:4004";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [completedLec, setCompletedLec] = useState(0);
  const [lecLength, setLecLength] = useState(0);
  const [progress, setProgress] = useState([]);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  // fetch lectures
  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  // fetch single lecture
  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are Your sure to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLecLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchProgress();
    } catch (error) {
      console.log(data.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="progres">
            Lecture Completed {completedLec} out of {lecLength} <br />
            <progress value={completed} max={100}></progress>
            {completed} %
          </div>
          <div className="lectures-page flex justify-between min-h-[80vh] sm:flex-col sm:justify-center sm:items-center">
            <div className="left md:w-[70%] p-[10px] items-center w-90%">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        className="object-cover"
                        src={`${server}/${lecture.video}`}
                        width={"100%"}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <h1>{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (
                    <h1>Please select a lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="right w-[30%]">
              {user && user.role === "admin" && (
                <button
                  className="bg-gray-500 text-white px-[20px] py-[10px] rounded-md shadow-md transition-200 ease-in-out"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Close" : "Add Lecture+"}
                </button>
              )}

              {show && (
                <div className="lecture-form p-[30px] rounded-md shadow-md text-center w-auto">
                  <h2 className="text-[2rem] font-semi mb-[25px]">
                    Add Lecture
                  </h2>
                  <form
                    onSubmit={submitHandler}
                    className="text-left block mb-[5px] text-[14px]"
                  >
                    <label>Title</label>
                    <input
                      className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Description</label>
                    <input
                      className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md"
                      type="text"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                      className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md"
                      type="file"
                      placeholder="choose file"
                      required
                      onChange={changeVideoHandler}
                    />
                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width={300}
                        controls
                      ></video>
                    )}
                    <button
                      disabled={btnLoading}
                      className="bg-gray-900 text-white px-[20px] py-[10px] rounded-md shadow-md"
                      type="submit"
                    >
                      {btnLoading ? "Please Wait.." : "Add"}
                    </button>
                  </form>
                </div>
              )}
              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={i}>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`lecture-number text-2xl font-semi my-4 flex flex-wrap text-center bg-green-500 px-[20px] py-[15px] text-white${
                        lecture._id === e._id ? " active" : ""
                      }`}
                    >
                      {i + 1}. {e.title}
                      {progress &&
                        progress[0]?.completedLec.includes(e._id) && (
                          <span className="bg-red-400 p-[4px] text-green-300 rounded-md">
                            <TiTick />
                          </span>
                        )}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        onClick={() => deleteHandler(e._id)}
                        className="bg-red-500 text-white px-[20px] py-[10px] rounded-md shadow-md"
                      >
                        Delete Lecture
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No lectures yet !</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
