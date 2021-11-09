import React, { useEffect, useState, useContext, useRef } from "react";
import Dropzone from "react-dropzone";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import download from "downloadjs";
import '../../../css/Upload.scss'
import { Context } from "../../../context/Context.js";
import '../../../css/units.css'
import Star from '../../../../src/icons/star.png'

export default function Notes(props) {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [getFiles, setGetFiles] = useState(true);
  const [title, setTitle] = useState("");
  const { user } = useContext(Context);
  // const [isStarred, setIsStarred] = useState({});
  const dropRef = useRef();

  function onDrop(files) {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  }
  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  function handleGetFiles() {
    setGetFiles(true);
  }

  function handleUploadFiles() {
    setGetFiles(false);
  }

  async function handleStar(file) {
    try {
      const fileId = file["_id"];
      console.log(fileId);
      if (file["likedBy"].indexOf(user._id) > -1) {
        await axios.put("/users/unstar/" + user._id, { fileId: fileId });
        await axios.put("/files/unstar/" + fileId, { userId: user._id });
      } else {
        await axios.put("/users/star/" + user._id, { fileId: fileId });
        await axios.put("/files/star/" + fileId, { userId: user._id });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete(id) {
    try {
      await axios.delete("/files/delete/" + id);
    } catch (err) {
      console.log(err);
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  async function handleUpload(event) {
    event.preventDefault();

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      const userName = user.fname + " " + user.lname;
      data.append("title", title);
      data.append("fileName", fileName);
      data.append("subjectName", props.name);
      data.append("userName", userName);
      data.append("userId", user._id);
      data.append("file", file);

      try {
        await axios.post("/files/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    setGetFiles(true);
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
      const res = await axios.get("files/" + props.name);
      setFiles(res.data);
      // const stars = {};
      // for (let i = 0; i < files.length; i++) {
      //   stars[files[i]._id] = user.starredFiles.indexOf(files[i]) + 1;
      // }
      // console.log(stars);
      // setIsStarred(stars);
    };
    fetchPosts();
  });

  return (
    <div>
      <div>
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
          Download Notes
        </a>
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
          Upload
        </a>
      </div>

      {getFiles ? (
        // get files

        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>File</th>
              <th>Uploaded By</th>
            </tr>
          </thead>

          <tbody>
            {files.map((f) => (
              <tr key={f["_id"]}>
                
                <td>
                <img
                  src={
                    f["likedBy"].indexOf(user._id) > -1
                      ? process.env.PUBLIC_URL + "/icons/starred.png"
                      : process.env.PUBLIC_URL + "/icons/star.png"
                  }
                  onClick={() => {
                    handleStar(f);
                  }}
                  style={{ width: "12px", height: "12px" }}
                  alt=""
                />
                </td>
                {/* <td
                  onClick={() => {
                    handleStar(f);
                  }}
                >
                  {f["likedBy"].indexOf(user._id) > -1 ? "Unstar" : "Star"}
                </td> */}
                <td>{f["title"]}</td>
                <td>
                  <a
                    style={{ display: "block" }}
                    href="#/"
                    onClick={() =>
                      downloadFile(f["_id"], f["file_path"], f["file_mimetype"])
                    }
                  >
                    {f["fileName"]}
                  </a>
                </td>
                <td>{f["userName"]}</td>
                {f["userId"] === user._id ? (
                  <td
                    onClick={() => {
                      handleDelete(f["_id"]);
                    }}
                  >
                    <Button variant='danger' size='sm'>Delete</Button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        // Upload files

        <div>
          <Form className="search-form" onSubmit={handleUpload}>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Row>
              <Col>
                <Form.Group controlId="title">
                  <Form.Control
                    type="text"
                    name="title"
                    value={title || ""}
                    placeholder="Enter title"
                    onChange={handleTitleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="upload-section">
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder("over")}
                onDragLeave={() => updateBorder("leave")}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({ className: "drop-zone" })}
                    ref={dropRef}
                  >
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                      <div>
                        <strong>Selected file:</strong> {file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
