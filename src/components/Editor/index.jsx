import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadImg } from '@/services/upload';
import { useMdParse, useMessage } from '@/hooks';

const Index = (props) => {
  const { id, value, onChange } = props;
  const messagePro = useMessage();
  const mdParser = useMdParse();

  const handleImageUpload = async (file, callback) => {
    const { imgUrl, success } = await uploadImg({
      file
    });
    messagePro({
      response: { success },
      successText: '上传成功',
      onSuccess: () => {
        callback(imgUrl);
      }
    });
  };

  return (
    <MdEditor
      id={id}
      value={value}
      placeholder="请输入发布文章内容"
      renderHTML={(text) => mdParser.render(text)}
      config={{
        view: {
          menu: true,
          md: true,
          html: true
        }
      }}
      onChange={({ text }) => {
        onChange(text);
      }}
      onImageUpload={handleImageUpload}
    />
  );
};

export default Index;
