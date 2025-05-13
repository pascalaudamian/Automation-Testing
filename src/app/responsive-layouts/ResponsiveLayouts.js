import React from 'react';
import './ResponsiveLayouts.css'; // We'll add the CSS here.

const ResponsiveLayouts = () => {
  return (
    <div className="container">
      <section className="layout grid-layout">
        <h2>Grid Layout</h2>
        <div className="grid-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Item 1</h3>
          <p>This is a grid item with some text and an image.</p>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Item 2</h3>
          <p>This is another grid item with an image and text.</p>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Item 3</h3>
          <p>More grid items can have content like text and images.</p>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Item 4</h3>
          <p>This item also contains text and an image.</p>
        </div>
      </section>

      <section className="layout two-column">
        <h2>Two-Column Layout</h2>
        <div className="column left">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Left Column</h3>
          <p>This is the left column with an image and text content.</p>
        </div>
        <div className="column right">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Right Column</h3>
          <p>This is the right column, also with some text and an image.</p>
        </div>
      </section>

      <section className="layout three-column">
        <h2>Three-Column Layout</h2>
        <div className="column">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Column 1</h3>
          <p>This is the first column with an image and text.</p>
        </div>
        <div className="column">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Column 2</h3>
          <p>This is the second column with content.</p>
        </div>
        <div className="column">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Column 3</h3>
          <p>The third column also has an image and text content.</p>
        </div>
      </section>

      <section className="layout flexbox-layout">
        <h2>Flexbox Layout</h2>
        <div className="flex-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Flex Item 1</h3>
          <p>This is the first flex item with an image and some text.</p>
        </div>
        <div className="flex-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Flex Item 2</h3>
          <p>This is the second flex item with content.</p>
        </div>
        <div className="flex-item">
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
          <h3>Flex Item 3</h3>
          <p>The third flex item contains an image and some more text.</p>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveLayouts;
