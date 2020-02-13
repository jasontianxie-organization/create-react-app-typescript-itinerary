import React from "react";
import "./App.module.scss";
import intl from "react-intl-universal";
import { Carousel, Button, List, Avatar, Icon, Input, Tag } from "antd";
import {withRouter} from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Footer from "@/components/footer";
import {request} from "@/fetchServerData/axios";
import { connect } from "react-redux";
const {Search} = Input;

// 模拟假数据
const listData: any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`, // 文章标题
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", // 作者头像
    description: // 文章标签，就是搜索框里面的热门、月份、类型等标签
      "标签1，标签2，标签3，重庆，三个人，亲子游",
    content: // 文章内容摘要
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure),to help people create their product prototypes beautifully and efficiently.",
  });
}

const tagData: string[] = ["重庆", "chengduchengduchengduchengduchengduchengduchengdu", "zhejiang", "qingdao", "tailand"];
const hot: string[] = ["新疆", "西藏", "苏梅岛", "马尔代夫", "三亚", "重庆", "荷兰", "澳大利亚"];
const month: string[] = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const type: string[] = ["亲子", "父母", "情侣", "独自一人", "毕业旅行", "自驾"];
// 模拟假数据
interface IParams {type: any; text: any; }
const IconText = ({ type, text }: IParams) => (
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
  public getData() {
    request.get("/api/mainPageSlideData").then((data) => {
      console.log(data);
    },
    (err) => console.log(err));
  }
  public render() {
    return (
      <div styleName="app">
        <header styleName="app-header">
          <Carousel autoplay>
            <div>
              <div className="slide-item" style={{backgroundImage: "url(/public/mainPageSlidePics/15380434541828.jpeg)"}}></div>
            </div>
            <div>
              <div className="slide-item" style={{backgroundImage: "url(/public/mainPageSlidePics/15381044615697.jpeg)"}}></div>
            </div>
            <div>
              <div className="slide-item" style={{backgroundImage: "url(/public/mainPageSlidePics/15381045921996.jpeg)"}}></div>
            </div>
            <div>
              <div className="slide-item" style={{backgroundImage: "url(/public/mainPageSlidePics/15381046688621.jpeg)"}}></div>
            </div>
          </Carousel>
        </header>
        <div styleName="content">
          <div styleName="content-header">
            <div styleName="nav">
              <Button onClick={() => this.toggleSearch()}>{intl.get("pages.main.navHeader.searchItinerary")}</Button>
              <Button onClick={() => this.getData()}>{intl.get("pages.main.navHeader.schedule")}</Button>
              <Button onClick={() => this.props.history.push("newItinerary")}>{intl.get("pages.main.navHeader.recordItinerary")}</Button>
            </div>
            <CSSTransition timeout={500} in={this.state.inProps} classNames="search">
              <div styleName="search-detail">
                <div styleName="search-input">
                  <Search placeholder="input search text" onSearch={(value: string) => console.log(value)} enterButton />
                  <div styleName="tag-wrap">
                    {tagData.map((data, i) => <Tag key={i} color="blue" title={data}>{data}</Tag>)}
                  </div>
                </div>
                <div styleName="search-tip">
                  <span styleName="tip-title">热门</span>
                  <div styleName="tip-wrap">
                    {hot.map((i, index) => <span key={index} styleName="tips">{i}</span>)}
                  </div>
                </div>
                <div styleName="search-tip">
                  <span styleName="tip-title">月份</span>
                  <div styleName="tip-wrap">
                    {month.map((i, index) => <span key={index} styleName="tips">{i}</span>)}
                  </div>
                </div>
                <div styleName="search-tip">
                  <span styleName="tip-title">类型</span>
                  <div styleName="tip-wrap">
                    {type.map((i, index) => <span key={index} styleName="tips">{i}</span>)}
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
                pageSize: 10,
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
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    value: state.count,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onIncreaseClick: () => dispatch({}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
