"use client"
import React, { useState } from 'react';
import './ResponsiveLayouts.css';

const ResponsiveLayouts = () => {
    const [activeTab, setActiveTab] = useState('grid');
    const placeholderUrl = 'https://placehold.co/150'; // Using placehold.co

    return (
        <div className="container">
            <div className="tab-menu">
                <button
                    className={activeTab === 'grid' ? 'active' : ''}
                    onClick={() => setActiveTab('grid')}
                >
                    Grid Layout
                </button>
                <button
                    className={activeTab === 'twoColumn' ? 'active' : ''}
                    onClick={() => setActiveTab('twoColumn')}
                >
                    Two-Column Layout
                </button>
                <button
                    className={activeTab === 'threeColumn' ? 'active' : ''}
                    onClick={() => setActiveTab('threeColumn')}
                >
                    Three-Column Layout
                </button>
                <button
                    className={activeTab === 'flexbox' ? 'active' : ''}
                    onClick={() => setActiveTab('flexbox')}
                >
                    Flexbox Layout
                </button>
            </div>

            {activeTab === 'grid' && (
                <section className="layout grid-layout">
                    <div className="grid-item">
                        <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Item 1</h3>
                        <p><b>This is a grid item with some text and an image.</b></p>
                    </div>
                    <div className="grid-item">
                        <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Item 2</h3>
                        <p>This is another grid item with an image and text.</p>
                    </div>
                    <div className="grid-item">
                        <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Item 3</h3>
                        <p>More grid items can have content like text and images.</p>
                    </div>
                    <div className="grid-item">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Item 4</h3>
                        <p><b>This item also contains text and an image.</b></p>
                    </div>
                </section>
            )}

            {activeTab === 'twoColumn' && (
                <section className="layout two-column">
                    <div className="column left">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Left Column</h3>
                        <p>This is the left column with an image and text content.</p>
                    </div>
                    <div className="column right">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Right Column</h3>
                        <p>This is the right column, also with some text and an image.</p>
                    </div>
                </section>
            )}

            {activeTab === 'threeColumn' && (
                <section className="layout three-column">
                    <div className="column">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Column 1</h3>
                        <p>This is the first column with an image and text.</p>
                    </div>
                    <div className="column">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Column 2</h3>
                        <p>This is the second column with content.</p>
                    </div>
                    <div className="column">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Column 3</h3>
                        <p>The third column also has an image and text content.</p>
                    </div>
                </section>
            )}

            {activeTab === 'flexbox' && (
                <section className="layout flexbox-layout">
                    <div className="flex-item">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Flex Item 1</h3>
                        <p>This is the first flex item with an image and some text.</p>
                    </div>
                    <div className="flex-item">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Flex Item 2</h3>
                        <p>This is the second flex item with content.</p>
                    </div>
                    <div className="flex-item">
                         <img src={placeholderUrl} alt="Placeholder" />
                        <h3>Flex Item 3</h3>
                        <p>The third flex item contains an image and some more text.</p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResponsiveLayouts;
