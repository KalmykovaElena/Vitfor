/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Button, Select } from 'antd';

const MultipleSelect = ({ items }) => {
  const [open, setOpen] = useState(false);

  //   const { Option } = Select;
  const handleClick = () => {
    setOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      {' '}
      <Select
        defaultValue="lucy"
        style={{
          width: 300,
        }}
        open={open}
        mode="multiple"
        options={items}
        onChange={handleChange}
        onDropdownVisibleChange={(visible) => setOpen(visible)}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <div>
              <Button type="primary" onClick={handleClick}>
                click me to close
              </Button>
            </div>
          </div>
        )}
      >
        {/* <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option> */}
      </Select>
    </div>
  );
};

export default MultipleSelect;
