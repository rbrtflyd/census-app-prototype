import { Text as RadixText } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '~/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof textVariants;
  size?: keyof typeof textSizes;
  weight?: keyof typeof textWeights;
  leading?: keyof typeof textLeadings;
  italic?: boolean;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const textVariants = {
  'large-heading-01': {
    size: 'large' as const,
    weight: 'bold' as const,
    leading: 'none' as const,
  },
  'large-heading-00': {
    size: 'large' as const,
    weight: 'medium' as const,
    leading: 'none' as const,
  },
  'heading-01': {
    size: 'base' as const,
    weight: 'bold' as const,
    leading: 'none' as const,
  },
  'body-02': {
    size: 'base' as const,
    weight: 'medium' as const,
    leading: 'normal' as const,
  },
  'body-01': {
    size: 'base' as const,
    weight: 'normal' as const,
    leading: 'normal' as const,
  },
  'small-heading-01': {
    size: 'small' as const,
    weight: 'bold' as const,
    leading: 'none' as const,
  },
  'small-heading-00': {
    size: 'small' as const,
    weight: 'medium' as const,
    leading: 'none' as const,
  },
  'small-body-01': {
    size: 'small' as const,
    weight: 'normal' as const,
    leading: 'normal' as const,
  },
  'utility-02': {
    size: 'mini' as const,
    weight: 'medium' as const,
    leading: 'none' as const,
  },
  'utility-01': {
    size: 'mini' as const,
    weight: 'normal' as const,
    leading: 'none' as const,
  },
  'utility-00': {
    size: 'mini' as const,
    weight: 'light' as const,
    leading: 'none' as const,
  },
  'small-utility-02': {
    size: 'tiny' as const,
    weight: 'medium' as const,
    leading: 'none' as const,
  },
  'small-utility-01': {
    size: 'tiny' as const,
    weight: 'normal' as const,
    leading: 'none' as const,
  },
};

const textSizes = {
  large: 'text-lg',
  base: 'text-base',
  small: 'text-sm',
  mini: 'text-xs',
  tiny: 'text-xxs',
};

const textLeadings = {
  none: 'leading-none',
  snug: 'leading-snug',
  normal: 'leading-normal',
};

const textWeights = {
  bold: 'font-bold',
  medium: 'font-medium',
  normal: 'font-normal',
  light: 'font-light',
};

export const CText = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const variant = props.variant ? textVariants[props.variant] : null;
  return (
    <RadixText
      ref={ref}
      className={cn(
        textSizes[variant?.size || props.size || 'base'],
        textWeights[variant?.weight || props.weight || 'normal'],
        textLeadings[variant?.leading || props.leading || 'normal'],
        props.italic && 'italic',
        props.truncate && 'truncate',
        props.className
      )}>
      {props.children}
    </RadixText>
  );
});

CText.displayName = 'CText';
