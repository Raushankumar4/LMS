import React from "react";
// import Marquee from "react-fast-marquee";

const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <>
      <section className="Testimonial">
        <h2 className="text-[32px] text-[#8a4baf] mb-[30px]">
          What our students say
        </h2>
        {/* <Marquee pauseOnHover speed={40}> */}
        <div className="testmonilas-cards flex flex-wrap justify-center gap-[30px] py-[80px] px-0 text-center">
          {testimonialsData.map((elem) => {
            return (
              <div
                key={elem.id}
                className="shadow-md bg-white p-[20px] rounded-md w-[300px] text-left flex-col items-center flex"
              >
                <div className="student-image">
                  <img src={elem.image} alt="" />
                </div>
                <p>{elem.message}</p>
                <div className="info">
                  <p className="name">{elem.name}</p>
                  <p className="postion">{elem.position}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* </Marquee> */}
      </section>
    </>
  );
};

export default Testimonial;
