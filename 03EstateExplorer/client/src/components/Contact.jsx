import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landLoard, setLandLoard] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandloard = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        setLandLoard(data);
      } catch (error) {
        console.log(`Error While fetchning user in contact : ${error}`);
      }
    };
    fetchLandloard();
  }, [listing.userRef]);
  return (
    <>
      {landLoard && (
        <div className="flex flex-col gap-2">
          <p className="font-normal">
            Contact <span className="font-bold">{landLoard.username} for</span>{" "}
            <span className="font-bold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            value={message}
            onChange={onChange}
            name="message"
            id="message"
            rows="2"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter your message here..."
          ></textarea>
          <Link
            className="bg-orange-600 text-white text-center p-3 uppercase rounded-lg hover:bg-orange-400"
            to={`mailto:${landLoard.email}?subject=regarding${listing.name}&body${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
