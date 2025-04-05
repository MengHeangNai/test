'use client';
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

// Type definitions
interface CustomSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    children: ReactNode;
    id?: string;
    className?: string;
}

interface CustomSelectTriggerProps {
    id?: string;
    children: ReactNode;
    onClick: () => void;
    isOpen: boolean;
    className?: string;
}

interface CustomSelectValueProps {
    children: ReactNode;
    value: string;
    placeholder: string;
}

interface CustomSelectContentProps {
    children: ReactNode;
    onSelect: (value: string) => void;
}

interface CustomSelectItemProps {
    children: ReactNode;
    value: string;
    onSelect?: (value: string) => void;
}

// Custom Select component
export const CustomSelect: React.FC<CustomSelectProps> = ({
    value,
    onValueChange,
    children,
    id,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className || ''}`} ref={selectRef}>
            <CustomSelectTrigger
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            >
                <CustomSelectValue value={value} placeholder="Select level">
                    {children}
                </CustomSelectValue>
            </CustomSelectTrigger>

            {isOpen && (
                <CustomSelectContent onSelect={(val) => {
                    onValueChange(val);
                    setIsOpen(false);
                }}>
                    {children}
                </CustomSelectContent>
            )}
        </div>
    );
};

// Trigger component
export const CustomSelectTrigger: React.FC<CustomSelectTriggerProps> = ({
    id,
    children,
    onClick,
    isOpen,
    className
}) => {
    return (
        <button
            id={id}
            type="button"
            onClick={onClick}
            className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isOpen ? 'border-blue-500 ring-2 ring-blue-500' : ''} ${className || ''}`}
        >
            {children}
            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
    );
};

// Value display component
export const CustomSelectValue: React.FC<CustomSelectValueProps> = ({
    children,
    value,
    placeholder
}) => {
    // Find the display text for the selected value
    const getDisplayText = () => {
        let displayText = placeholder;

        React.Children.forEach(children, (child) => {
            if (React.isValidElement<CustomSelectItemProps>(child) && child.props.value === value) {
                displayText = String(child.props.children);
            }
        });

        return displayText;
    };

    return <span>{getDisplayText()}</span>;
};

// Dropdown content
export const CustomSelectContent: React.FC<CustomSelectContentProps> = ({
    children,
    onSelect
}) => {
    // Filter only SelectItem children and pass the onSelect handler
    const items = React.Children.map(children, child => {
        if (React.isValidElement(child) &&
            typeof child.type === 'function' &&
            (child.type as any).displayName === 'CustomSelectItem') {
            return React.cloneElement(child as React.ReactElement<CustomSelectItemProps>, {
                onSelect
            });
        }
        return child;
    });

    return (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
                {items}
            </div>
        </div>
    );
};

// Individual item in the dropdown
export const CustomSelectItem: React.FC<CustomSelectItemProps> = ({
    children,
    value,
    onSelect
}) => {
    return (
        <div
            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect && onSelect(value)}
        >
            {children}
        </div>
    );
};

// Set displayName for CustomSelectItem for type checking
CustomSelectItem.displayName = 'CustomSelectItem';