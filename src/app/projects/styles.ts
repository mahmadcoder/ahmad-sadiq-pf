import { css, cva } from "../../../styled-system/css";

export const section = css({
  maxW: { xl: '1120px', '2xl': '1520px' },
  margin: { xs: '8rem 2.125rem 5rem 2.125rem', xl: '12rem auto 8.75rem auto', '2xl': '15.625rem auto 8.75rem auto' },

  '& > h1': {
    color: 'gray.200',
    fontWeight: 'medium',
    fontSize: { xs: '1.5rem', xl: '2rem' },
    marginBottom: '3rem',
    '& strong': { color: 'white' }
  }
});

export const grid = css({
  display: 'grid',
  gap: { xs: '2rem', xl: '4rem' },
});

export const card = cva({
  base: {
    listStyle: 'none',
    display: 'grid',
    gap: { xs: '1.75rem', xl: '3rem' },
    alignItems: 'center',
    gridTemplateColumns: { xl: '1fr 1fr' },
  },
  variants: {
    align: {
      left: {},
      right: {
        '@media screen and (min-width: 1280px)': {
          '& > div:nth-child(1)': { order: 2 }, // image container
          '& > div:nth-child(2)': { order: 1 }, // content
        }
      },
    },
    theme: {
      purple: {},
      lavender: {},
      green: {},
      mint: {},
      dark: {},
    }
  }
});

export const cardImageWrap = cva({
  base: {
    rounded: '2rem',
    overflow: 'hidden',
    p: { xs: '1rem', xl: '2rem' },
    position: 'relative',
    transition: 'transform 300ms ease, box-shadow 300ms ease',
    willChange: 'transform',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
    '_hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 28px 80px rgba(0,0,0,0.35)',
      '&::before': { opacity: 1 },
    },
    '_before': {
      content: '""',
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      bgGradient: 'to-b',
      gradientFrom: 'rgba(255,255,255,0.06)',
      gradientTo: 'rgba(0,0,0,0.0)',
      opacity: 0,
      transition: 'opacity 300ms ease',
    },
    '& img': {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      display: 'block',
      rounded: '1.25rem',
      transition: 'transform 350ms ease',
      transform: 'scale(1)'
    }
  },
  variants: {
    theme: {
      purple: { background: '#C69AFF' },
      lavender: { background: '#D7CBFF' },
      green: { background: '#86E39E' },
      mint: { background: '#B9F2D3' },
      dark: { background: 'gray.800' },
    }
  }
});

export const cardContent = css({
  '& .meta': {
    color: 'gray.500'
  }
});

export const tag = css({
  color: 'gray.500',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em'
});

export const title = css({
  color: 'white',
  fontWeight: 'semibold',
  fontSize: { xs: '1.5rem', xl: '1.75rem' },
  marginTop: '0.5rem'
});

export const desc = css({
  color: 'gray.300',
  lineHeight: '1.875rem',
  marginTop: '0.75rem'
});

export const buttonsRow = css({
  display: 'flex',
  gap: '0.75rem',
  mt: '1.25rem',
  flexWrap: 'wrap'
});

export const cta = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  h: '2.5rem',
  px: '1.25rem',
  rounded: '6.25rem',
  bg: 'purple.300',
  color: 'white',
  fontWeight: 'medium',
  '_hover': { filter: 'brightness(0.9)' }
});

export const githubBtn = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  h: '2.5rem',
  px: '1rem',
  rounded: '6.25rem',
  borderColor: 'gray.600',
  borderWidth: '1px',
  color: 'gray.100',
  '_hover': { filter: 'brightness(0.9)' },
  '& img': { width: '1rem', height: '1rem' }
});

export const techList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  mt: '1rem',
});

export const techBadge = css({
  fontSize: '0.8125rem',
  color: 'gray.100',
  borderColor: 'gray.700',
  borderWidth: '1px',
  rounded: '9999px',
  px: '0.75rem',
  py: '0.375rem',
  background: 'rgba(255,255,255,0.02)'
});
