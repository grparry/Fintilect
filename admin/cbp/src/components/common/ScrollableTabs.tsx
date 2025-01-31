import React, { useRef, useEffect } from 'react';
import { Box, Tab as MuiTab, Tabs as MuiTabs, TabProps, TabsProps, useTheme } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const SCROLL_AMOUNT = 200; // pixels to scroll on each button click

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick, disabled }) => {
  const theme = useTheme();
  
  return (
    <Box
      component="button"
      onClick={onClick}
      disabled={disabled}
      sx={{
        position: 'absolute',
        [direction === 'left' ? 'left' : 'right']: 0,
        top: 0,
        bottom: 0,
        width: 40,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.paper,
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        transition: 'background-color 0.2s',
        zIndex: 1,
        boxShadow: direction === 'left' 
          ? '2px 0 4px -2px rgba(0,0,0,0.2)'
          : '-2px 0 4px -2px rgba(0,0,0,0.2)',
        '&:not([disabled]):hover': {
          backgroundColor: theme.palette.action.hover,
        }
      }}
    >
      {direction === 'left' ? (
        <KeyboardArrowLeft sx={{ fontSize: 24 }} />
      ) : (
        <KeyboardArrowRight sx={{ fontSize: 24 }} />
      )}
    </Box>
  );
};

export interface ScrollableTabsProps extends Omit<TabsProps, 'children'> {
  tabs: Array<{
    label: string;
    value: string;
    id?: string;
    disabled?: boolean;
  }>;
  containerProps?: React.ComponentProps<typeof Box>;
}

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  containerProps,
  sx,
  ...tabsProps
}) => {
  const theme = useTheme();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = React.useState({
    left: false,
    right: true
  });

  const updateScrollButtons = () => {
    const tabsNode = tabsRef.current?.querySelector('.MuiTabs-scroller');
    if (tabsNode) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsNode;
      setScrollable({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 1 // -1 to account for rounding
      });
    }
  };

  useEffect(() => {
    const tabsNode = tabsRef.current?.querySelector('.MuiTabs-scroller');
    if (tabsNode) {
      const handleScroll = () => {
        updateScrollButtons();
      };
      tabsNode.addEventListener('scroll', handleScroll);
      // Initial check
      updateScrollButtons();
      return () => {
        tabsNode.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleScrollClick = (direction: 'left' | 'right') => {
    const tabsNode = tabsRef.current?.querySelector('.MuiTabs-scroller');
    if (tabsNode) {
      const scrollAmount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
      tabsNode.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        width: '100%',
        bgcolor: theme.palette.background.paper,
        position: 'relative',
        px: 5, // Add padding for scroll buttons
        ...containerProps?.sx
      }}
      {...containerProps}
    >
      <MuiTabs
        ref={tabsRef}
        variant="scrollable"
        scrollButtons={true}
        allowScrollButtonsMobile
        ScrollButtonComponent={({ direction, ...props }) => (
          <ScrollButton
            direction={direction === "left" ? "left" : "right"}
            onClick={() => handleScrollClick(direction === "left" ? "left" : "right")}
            disabled={!scrollable[direction === "left" ? "left" : "right"]}
          />
        )}
        sx={{
          minHeight: 48,
          '& .MuiTabs-scroller': {
            overflow: 'auto !important',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          },
          '& .MuiTabs-flexContainer': {
            gap: 2,
          },
          '& .MuiTab-root': {
            minHeight: 48,
            px: 3,
            minWidth: 'auto',
            fontWeight: 'medium',
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
          ...sx
        }}
        {...tabsProps}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            id={tab.id}
            disabled={tab.disabled}
          />
        ))}
      </MuiTabs>
    </Box>
  );
};

export default ScrollableTabs;
