import { Scroll, Text } from 'folds';
import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

import * as css from './Elements.css';

export enum MarkType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  StrikeThrough = 'strikeThrough',
  Code = 'code',
}

export enum BlockType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  CodeLine = 'code-line',
  CodeBlock = 'code-block',
  QuoteLine = 'quote-line',
  BlockQuote = 'block-quote',
  ListItem = 'list-item',
  OrderedList = 'ordered-list',
  UnorderedList = 'unordered-list',
}

export function RenderElement({ attributes, element, children }: RenderElementProps) {
  switch (element.type) {
    case BlockType.Paragraph:
      return (
        <Text className={css.Paragraph} {...attributes}>
          {children}
        </Text>
      );
    case BlockType.Heading:
      if (element.level === 1)
        return (
          <Text className={css.Heading} as="h2" size="H2" {...attributes}>
            {children}
          </Text>
        );
      if (element.level === 2)
        return (
          <Text className={css.Heading} as="h3" size="H3" {...attributes}>
            {children}
          </Text>
        );
      if (element.level === 3)
        return (
          <Text className={css.Heading} as="h4" size="H4" {...attributes}>
            {children}
          </Text>
        );
      return (
        <Text className={css.Heading} as="h3" size="H3" {...attributes}>
          {children}
        </Text>
      );
    case BlockType.CodeLine:
      return <div>{children}</div>;
    case BlockType.CodeBlock:
      return (
        <Text as="pre" className={css.CodeBlock}>
          <Scroll direction="Horizontal" variant="Warning" size="300" visibility="Hover" hideTrack>
            <div className={css.CodeBlockInternal}>{children}</div>
          </Scroll>
        </Text>
      );
    case BlockType.QuoteLine:
      return <div>{children}</div>;
    case BlockType.BlockQuote:
      return (
        <Text as="blockquote" className={css.BlockQuote}>
          {children}
        </Text>
      );
    case BlockType.ListItem:
      return <Text as="li">{children}</Text>;
    case BlockType.OrderedList:
      return <ol className={css.List}>{children}</ol>;
    case BlockType.UnorderedList:
      return <ul className={css.List}>{children}</ul>;
    default:
      return (
        <Text className={css.Paragraph} {...attributes}>
          {children}
        </Text>
      );
  }
}

export function RenderLeaf({ attributes, leaf, children }: RenderLeafProps) {
  let child = children;
  if (leaf.bold) child = <strong {...attributes}>{child}</strong>;
  if (leaf.italic) child = <i {...attributes}>{child}</i>;
  if (leaf.underline) child = <u {...attributes}>{child}</u>;
  if (leaf.strikeThrough) child = <s {...attributes}>{child}</s>;
  if (leaf.code)
    child = (
      <code className={css.Code} {...attributes}>
        {child}
      </code>
    );

  if (child !== children) return child;

  return <span {...attributes}>{child}</span>;
}
