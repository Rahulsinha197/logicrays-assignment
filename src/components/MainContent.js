import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Select,
  Table,
  message,
  Modal,
  Space,
  Row,
  Col,
} from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getLists, filterList } from "../services/Api";
import Image from "../images/image.jpg";
import Icon from "../images/icon.png";

const Option = Select.Option;
const { Column } = Table;
const copy = require("clipboard-copy");

export default function MainContent(props) {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [record, setRecord] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    chapter: "",
    class: "",
    language: "",
    subject: "",
    topicName: "",
    topicNumber: "",
  };

  const handleSubmit = (data) => {
    setLoading(true);
    console.log(data);
    const PromiseOne = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    const PromiseTwo = new Promise((resolve, reject) => {
      filterList(data).then((res) => {
        setList(res.data.results);
        resolve();
        form.resetFields();
      });
    });
    Promise.all([PromiseOne, PromiseTwo]).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const result = await getLists();
        setList(result?.data?.results);
      } catch (e) {
        console.error(e);
      }
    };
    getList();
  }, []);
  console.log(list);
  const getList = (key) => {
    let lang = [];
    list.forEach((data) => {
      lang.push(data[key]);
    });
    lang = [...new Set(lang)];
    return lang;
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleViewLists = (value) => {
    setRecord(value);
  };

  return (
    <>
      <div style={{ display: "flex", padding: "0 15px" }}>
        <Row gutter={16}>
          <Col span={6}>
            <img alt="" src={Icon} />
            <p>
              Maharishi Vidya Mandir Schools (MVMs) have been established to
              introduce Maharishi Consciousness based Education in Mainstream of
              school education in India. 165 schools in 16 states with about
              110000 students and about 7000 teaching, administrative and
              support staff has proven its importance in Indian society for last
              29 years. Keeping in view the local requirement, schools are
              functional from KG to 12th standard. 94 schools are affiliated
              with CBSE, New Delhi and rests are affiliated with respective
              State School Education Boards. MVM students apart from following
              CBSE or respective state school education course pattern, also
              learn Maharishi Vedic Science, and practice Transcendental
              Meditation and Yog as integral part of school routine. This
              approach has received wide appreciation from parents and they have
              acknowledged substantial improvement in their wards.
            </p>
          </Col>
          <Col span={18}>
            <div>
              <div>
                <div>
                  <h1 style={{ textAlign: "center" }}> Select Content</h1>
                </div>
                <div>
                  <Space>
                    <Form
                      onFinish={handleSubmit}
                      initialValues={initialValues}
                      form={form}
                      layout={"inline"}
                    >
                      <Row gutter={[16, 16]}>
                        <Col span="10">
                          <Form.Item
                            label="Language      "
                            name="language"
                            rules={[
                              {
                                required: true,
                                message: "Need to select atleast one language",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select a Language"
                              onSelect={handleChange}
                            >
                              {getList("language").map((list) => (
                                <Option value={list}>{list}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span="14">
                          <Form.Item
                            label="Subject"
                            name="subject"
                            rules={[
                              {
                                required: true,
                                message: "Need to select atlest one Subject",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select a Subject"
                              onSelect={handleChange}
                            >
                              {getList("subject").map((list) => (
                                <Option value={list}>{list}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="10">
                          <Form.Item
                            label="Class"
                            name="class"
                            rules={[
                              {
                                required: true,
                                message: "Need to select atleast one Class",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select a Class "
                              onSelect={handleChange}
                            >
                              {getList("grade").map((list) => (
                                <Option value={list}>{list}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="14">
                          <Form.Item
                            label="Chapter"
                            name="chapter"
                            rules={[
                              {
                                required: true,
                                message: "Need to select atleast one Chapter",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select a Chapter "
                              onSelect={handleChange}
                            >
                              {getList("chapter_name_original").map((list) => (
                                <Option value={list}>{list}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="10">
                          <Form.Item
                            label="Topic"
                            name="topicName"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Topic Name",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select a Topic "
                              onSelect={handleChange}
                            >
                              {getList("video_topic_name").map((list) => (
                                <Option value={list}>{list}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="14">
                          <Form.Item
                            label="Topic No"
                            name="topicNumber"
                            rules={[
                              {
                                required: true,
                                message: "Please enter the Topic Number",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select a Topic "
                              onSelect={handleChange}
                            >
                              {getList("video_topic_no").map((list) => (
                                <Option value={list}>{list}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="24">
                          <Form.Item style={{ textAlign: "center" }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                            >
                              Submit
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Space>
                </div>
              </div>
              <Table dataSource={list}>
                <Column
                  title="Watch Video Here..."
                  dataIndex="youtube_link"
                  key="youtube_link"
                  render={(text) => (
                    <a target="_blank" href={text} rel="noreferrer">
                      {<img style={{ height: "76px" }} alt="" src={Image} />}
                    </a>
                  )}
                />
                <Column
                  title="Video Title"
                  dataIndex="video_title"
                  key="video_title"
                />

                <Column
                  title="Copy Link"
                  dataIndex="youtube_link"
                  key="youtube_link"
                  render={(text) => (
                    <CopyOutlined
                      onClick={() =>
                        copy(text).then(() =>
                          message.success("Copied to clipboard")
                        )
                      }
                    />
                  )}
                />
                <Column
                  title=" See Details"
                  render={(text, record) => (
                    <Button
                      danger
                      onClick={() => {
                        setShowModal(!showModal);
                        handleViewLists(record);
                      }}
                    >
                      view
                    </Button>
                  )}
                />
              </Table>
            </div>
          </Col>
        </Row>
      </div>
      {!!list && (
        <Modal
          visible={showModal}
          onCancel={() => setShowModal(!setShowModal)}
          footer={false}
        >
          <h1> Description </h1>
          <h2>Video Title: {record?.video_title}</h2>
          <div>Language: {record?.language}</div>
          <div>Subject: {record?.subject}</div>
          <div>Chapter Name: {record?.chapter_name_original}</div>
          <div>Topic Name: {record?.video_topic_name}</div>
          <div>Video Topic Number: {record?.video_topic_no}</div>
        </Modal>
      )}
    </>
  );
}
