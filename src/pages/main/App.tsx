import React from "react";
import "./App.module.scss";
import { Carousel, Button, List, Avatar, Icon, Input, Tag } from "antd";
import { CSSTransition } from "react-transition-group";
const {Search} = Input;

// 模拟假数据
const listData: any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure),to help people create their product prototypes beautifully and efficiently.",
  });
}

const tagData: string[] = ["重庆", "chengduchengduchengduchengduchengduchengduchengdu", "zhejiang", "qingdao", "tailand"];
// 模拟假数据

const IconText = ({ type, text }: any) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inProps: false,
    };
  }
  public toggleSearch() {
    this.setState({inProps: !this.state.inProps});
  }
  public render() {
    return (
      <div styleName="app">
        <header styleName="app-header">
          <Carousel autoplay>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </header>
        <div styleName="content">
          <div styleName="content-header">
            <div styleName="nav">
              <Button onClick={() => this.toggleSearch()}>看别人</Button>
              <Button>自己去</Button>
              <Button>写游记</Button>
            </div>
            <CSSTransition timeout={500} in={this.state.inProps} classNames="search">
              <div styleName="search-detail">
                <div styleName="search-input">
                  <Search placeholder="input search text" onSearch={(value: string) => console.log(value)} enterButton />
                  <div styleName="tag-wrap">
                    {tagData.map((data, i) => <Tag key={i} color="blue" title={data}>{data}</Tag>)}
                  </div>
                </div>
              </div>
            </CSSTransition>
          </div>
          <div styleName="list">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page: number) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={listData}
              footer={
                <div>
                  <b>test ant design</b> footer part
                </div>
              }
              renderItem={(item: any) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                    <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                    <IconText type="message" text="2" key="list-vertical-message" />,
                  ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
