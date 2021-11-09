import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context.js";
import axios from "axios";
import download from "downloadjs";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { user } = useContext(Context);
  const [getFiles, setGetFiles] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [files, setFiles] = useState([]);
  const [starredFiles, setStarredFiles] = useState([]);
  const [updatedUser, setUpdatedUser] = useState([]);
  const name = user.fname + " " + user.lname;
  function handleGetFiles() {
    setGetFiles(true);
    const sfiles = [];
    // console.log(starredIds);
    updatedUser["starredFiles"].map(async (id) => {
      const resStarredFile = await axios.get("/files/starred/" + id);
      sfiles.push(resStarredFile.data[0]);

      
    });
    // const resStarredFiles = await axios.get(
    //   "/files/starred/" + updatedUser["starredFiles"]
    // );
    // setStarredFiles(resStarredFiles.data);
    setStarredFiles(sfiles);

    console.log(starredFiles[0])
  }

  function handleUploadFiles() {

    
    setGetFiles(false);
  }

  async function handleDelete(id) {
    try {
      await axios.delete("/files/delete/" + id);
    } catch (err) {
      console.log(err);
    }
  }

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/files/download/${id}`, {
        responseType: "blob",
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("files/byUserId/" + user._id);

      setFiles(res.data);
    };
    fetchPosts();
  });

  useEffect(() => {
    const fetchStarredPostsandUser = async () => {
      const resUser = await axios.get("/users/" + user._id);
      setUpdatedUser(resUser.data);
      // const sfiles = [];
      // // console.log(starredIds);
      // updatedUser["starredFiles"].map((async(id) => {
      //   const resStarredFile = await axios.get("/files/starred/" + id);
      //   sfiles.push(resStarredFile.data[0]);
      // }));
      // // const resStarredFiles = await axios.get(
      // //   "/files/starred/" + updatedUser["starredFiles"]
      // // );
      // // setStarredFiles(resStarredFiles.data);
      // setStarredFiles(sfiles);
    };
    fetchStarredPostsandUser();
  }, [starredFiles, user._id, updatedUser]);

  return (
    <div className="container-fluid pt-3">
      <h1>Welcome, {name}</h1>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <div>
        <a
          href="#/"
          style={{
            display: "inline-block",
            margin: "10px",
            textDecoration: "none",
            color: getFiles ? "grey" : "black",
          }}
          onClick={handleUploadFiles}
        >
          Uploaded By You
        </a>
        <a
          href="#/"
          style={{
            display: "inline-block",
            margin: "10px",
            textDecoration: "none",
            color: getFiles ? "black" : "grey",
          }}
          onClick={handleGetFiles}
        >
          Starred By You
        </a>
      </div>

      {getFiles ? (
        <div>
          <Table striped bordered hover>
            <thead className="styled-table">
              <tr>
                
                <th>Title</th>
                <th>Subject</th>
                <th>File</th>
                <th>Uploaded By</th>
              </tr>
            </thead>

            <tbody>
              {starredFiles.map((f) => (
                <tr key={f["_id"]} className="active-row">
                  <td>{f["title"]}</td>
                  <td>{f["subjectName"]}</td>
                  <td>
                    <a
                      style={{ display: "block" }}
                      href="#/"
                      onClick={() =>
                        downloadFile(
                          f["_id"],
                          f["file_path"],
                          f["file_mimetype"]
                        )
                      }
                    >
                      {f["fileName"]}
                    </a>
                  </td>
                  <td>{f["userName"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead className="styled-table">
              <tr>
                {/* <th></th> */}
                <th>Title</th>
                <th>Subject</th>
                <th>File</th>
              </tr>
            </thead>

            <tbody>
              {files.map((f) => (
                <tr key={f["_id"]} className="active-row">
                  <td>{f["title"]}</td>
                  <td>{f["subjectName"]}</td>
                  <td>
                    <a
                      style={{ display: "block" }}
                      href="#/"
                      onClick={() =>
                        downloadFile(
                          f["_id"],
                          f["file_path"],
                          f["file_mimetype"]
                        )
                      }
                    >
                      {f["fileName"]}
                    </a>
                  </td>

                  <td
                    onClick={() => {
                      handleDelete(f["_id"]);
                    }}
                  >
                    <Button variant='danger' size='sm'>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>{" "}
        </div>
      )}
    </div>
  );
};

export default Profile;