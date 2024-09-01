import React from 'react';
import { Box, Typography } from '@mui/material';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';

interface FormattedTextProps {
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag') {
        // Custom rendering for <pre> tags to apply specific styles
        if (domNode.name === 'pre') {
          return (
            <Box
              component="pre"
              sx={{
                backgroundColor: 'grey.100',
                p: 2,
                borderRadius: 1,
                fontFamily: 'Consolas, monospace',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                my: 2,
                fontSize: '0.875rem',
              }}
            >
              {domToReact(domNode.children, options)}
            </Box>
          );
        }
        // Custom rendering for <code> tags to apply specific styles
        if (domNode.name === 'code') {
          return (
            <Box
              component="code"
              sx={{
                backgroundColor: 'grey.100',
                p: 0.5,
                borderRadius: 0.5,
                fontFamily: 'Consolas, monospace',
                fontSize: '0.875em',
              }}
            >
              {domToReact(domNode.children, options)}
            </Box>
          );
        }
      }
    },
  };

  // Render the parsed HTML content within a Typography component
  return <Typography component="div">{parse(text, options)}</Typography>;
};

export default FormattedText;
