import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Create.less';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['organization/submitCreate'],
}))
@Form.create()
export default class CreateOrgnaization extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'organization/submitCreate',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form; // getFieldValue

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="创建组织" content="组织是用来创建活动的前提条件，同时组织也是管理活动的方法">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            // hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入组织的名称',
                }],
              })(
                <Input placeholder="名称会被用来展示和识别您的组织" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Logo"
            >
              {getFieldDecorator('logo', {
                rules: [{
                  required: true, message: '请上传组织的logo',
                }],
              })(
                <Input placeholder="http://xxx" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  联系电话
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="包含区号和国家区号">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('contact')(
                <Input placeholder="021-1234567" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>Email<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('email')(
                <Input placeholder="xxx@xxx.xxx" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>地址<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('address')(
                <Input placeholder="上海市徐汇区xxxxxxx" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>官方网站<em className={styles.optional}>（选填）</em></span>}
            >
              {getFieldDecorator('site')(
                <Input placeholder="http://xxxxx" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="公开引用选项"
              help="是否允许其他人引用这个组织进行活动。"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: 'NONE',
                })(
                  <Radio.Group>
                    <Radio value="PUBLIC">公开</Radio>
                    <Radio value="VERIFY">验证公开</Radio>
                    <Radio value="NONE">不公开</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>放弃</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
