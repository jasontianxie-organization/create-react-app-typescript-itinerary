import * as React from "react";
import "./index.module.scss";
import UploadModal from "@/components/upload";
import { Button, Icon } from "antd";

type OnChange = (val?: string) => void;
interface ITineraryEditorProps {
    value?: any; // 设置默认值
    onChange: OnChange;
    style?: any;
    uploadFile: any;
    uploadList: any[];
    currentSpotId: number;
    currentItineraryId: number;
  }
function PicStatus(props: any) {
    const {item, insert} = props;
    return (
        <div styleName="upload-item">
            {
                item.status === "start" ? (
                    <div styleName={`upload-item-${item.status}`}>
                        <Icon type="loading" style={{fontSize: "35px"}}/>
                    </div>
                ) : (
                    item.status === "success" ? (
                        <div title="点击插入" onClick={insert} styleName={`upload-item-${item.status}`} style={{backgroundImage: `url(${item.path})`}}></div>
                    ) : (
                        <div styleName={`upload-item-${item.status}`}>
                            <Icon type="frown" style={{color: "red", fontSize: "35px"}}/>
                        </div>
                    )
                )
            }
            <span>{item.file.file.name}</span>
        </div>
    );
}
export default class ItineraryEditor extends React.Component<ITineraryEditorProps, any> {
    public uploadFormRef: any;
    private textInput: any;
    constructor(props: ITineraryEditorProps) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            focused: false,
            selection: null,
            range: null,
            uploadModalVisible: false,
            tabOnDisplay: 1,
        };
    }
    public insertPicOrPaste(e: any) { // 只允许用户粘贴纯文本，安全考虑
        let str = "";
        const {selection, range} = this.state;

        // if (!this.state.focused || !range) { // 当用户没有点击输入框的时候，如果点击插入图片，则插入操作不生效
        //     return;
        // }
        if (!range) { // 当用户没有点击输入框的时候，如果点击插入图片，则插入操作不生效
            return;
        }
        if (e.type && e.type === "insertPic") { // 如果是插入图片或者表情
            const background = e.path;
            str = "<img src='" + background + "' style='width:100%;'/>";
        } else { // 如果是用户粘贴内容
            e.preventDefault(); // 不使用默认的粘贴方法，而是使用下面的range来插入内容
            str = window.clipboardData && window.clipboardData.getData ?
            window.clipboardData.getData("Text") // ie浏览器，getData("Text")只会获取纯文本（只允许用户粘贴纯文本，安全考虑），除了Text，还有其他参数吗？？
            : e.clipboardData.getData("Text"); // 非ie浏览器，getData("Text")只会获取纯文本（只允许用户粘贴纯文本，安全考虑）
            str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // 用户粘贴的内容中如果有<这种html标签，就替换成html实体。如果不是粘贴的，而是用户手动输入的<符号，那么浏览器会自动转换成html实体
        }
        if (!window.getSelection) {// 如果是ie 浏览器
            this.textInput.current.focus();
            range.pasteHTML(str); // 这个方法只有ie浏览器有
            range.collapse(false); // 折叠到range的终点，https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapse
            range.select(); // 需要这个方法吗？
        } else {
            const fragment = range.createContextualFragment(str); // 上面的range.pasteHTML这个方法只有ie浏览器有，其他浏览器的range智能用insertNode方法插入dom节点（或者dom片段Fragment），所以我们这里是创建了一个fragment片段
            range.insertNode(fragment); // 因为没有pasteHTML这个方法，所以使用insertNode来插入fragment片段
            selection.removeAllRanges();
            range.collapse(false);
            selection.addRange(range);
        }
        this.onChange();
    }
    public input(e: any) { // 当用户输入或删除内容后，光标会随着移动，所以需要重新获取光标的位置。
        const selection = window.getSelection ? window.getSelection() : document.selection; // window.getSelection是Chrome，FF，等主流浏览器方法，document.selection是IE方法
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
        this.onChange();
    }
    public keyup(e: any) {
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) { // 上下左右键
            const selection = window.getSelection ? window.getSelection() : document.selection;
            const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
            this.setState({ selection, range });
        }
    }
    public focus(bool: boolean, e?: any) {
        if (e && e.relatedTarget && e.relatedTarget.className.includes("ant-btn")) {
            return;
        }
        this.setState({ focused: bool });
    }
    public click(e: any) {
        const selection = window.getSelection ? window.getSelection() : document.selection;
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
    }
    public onChange() {
        this.props.onChange(this.textInput.current.innerHTML);
    }
    public saveFormRef = (formRef: any) => {
        this.uploadFormRef = formRef;
      }
    public showModal = () => {
        this.setState({ uploadModalVisible: true });
    }
    public handleUploadCancel = () => {
        this.setState({ uploadModalVisible: false });
    }
    public handleSave() {
        this.setState({ uploadModalVisible: false });
    }
    public showMedia() {
        this.setState({ tabOnDisplay: 1 });
    }
    public showEmoji() {
        this.setState({ tabOnDisplay: 2 });
    }
    public handleUpload = () => {
        const { form } = this.uploadFormRef.props;
        form.validateFields((err: any, values: any) => {
            if (err) {
            return;
            }
            console.log("Received values of form: ", values);
            this.props.uploadFile({destUrl: "/api/uploads/parts", file: values, spotId: this.props.currentSpotId, itineraryId: this.props.currentItineraryId});
            form.resetFields();
            this.setState({ uploadModalVisible: false });
        });
    }
    public componentWillReceiveProps(nextProps: ITineraryEditorProps) {
        if (nextProps.value === "") {
            this.textInput.current.innerHTML = nextProps.value;
        }
    }
    public render() {
        const {style = {}, uploadList = []} = this.props;
        return (
        <div styleName="edit-wrap">
            <div contentEditable={true} styleName = "edit" ref={this.textInput}
                style={style}
                onPaste={(e) => this.insertPicOrPaste(e)}
                onClick={(e) => this.click(e)}
                onKeyUp={(e) => this.keyup(e)}
                onFocus={() => this.focus(true)}
                onBlur={(e) => this.focus(false, e)}
                onInput={(e) => this.input(e)}>
            </div>
            <div styleName="media">
                <ul styleName="tab">
                    <li onClick={() => this.showMedia()}><Icon style={{fontSize: "20px"}} type="file-jpg" /></li>
                    <li onClick={() => this.showEmoji()}><Icon style={{fontSize: "20px"}} type="smile" /></li>
                </ul>
                <ul styleName="tab-content">
                    <li style={{display: (this.state.tabOnDisplay === 1 ? "block" : "none")}}>
                        <div styleName="upload-list-wrap">
                            {uploadList.map((item: any, index: number) => {
                                return <PicStatus key={index} item={item} insert={() => this.insertPicOrPaste({type: "insertPic", path: item.path})}/>;
                            })}
                        </div>
                        <Button onClick={() => this.showModal()}>上传</Button>
                    </li>
                    <li style={{display: (this.state.tabOnDisplay === 2 ? "block" : "none")}}>点击添加表情</li>
                </ul>
            </div>
            <UploadModal
                wrappedComponentRef={this.saveFormRef} // 经过 Form.create 包装的组件将会自带 this.props.form 属性
                visible={this.state.uploadModalVisible}
                onCancel={this.handleUploadCancel}
                onUpload={this.handleUpload}
            />
        </div>
        );
    }
}
