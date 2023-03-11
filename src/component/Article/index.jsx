import React, { useEffect, useRef } from 'react';
import 'highlight.js/styles/agate.css';
import hljs from 'highlight.js/lib/core';
import { useMdParse } from '@/hooks';
import './index.css';

function Index(props) {
  const { html } = props;
  const ref = useRef({});
  const mdParser = useMdParse();

  useEffect(() => {
    ref?.current?.querySelectorAll('pre, code').forEach((element) => {
      hljs.highlightElement(element);
    });
  }, []);

  return (
    <div
      className="custom-blockquote-style custom-table-style"
      dangerouslySetInnerHTML={{ __html: mdParser.render(html) }}
      ref={ref}
    />
  );
}

export default Index;
