import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { HiQuestionMarkCircle } from "react-icons/hi";

import "./index.css";

const categoryList = [
  {
    id: uuidv4(),
    name: "walkthrough",
  },
  {
    id: uuidv4(),
    name: "helparticles",
  },
  {
    id: uuidv4(),
    name: "watsnew",
  },
];

const Widget = (props) => {
  const { details } = props;
  const answerArray = details;
  const [selectedTab, ShiftTab] = useState(categoryList[0].name);

  const checkExist = (uniques, element) => {
    let index = uniques.findIndex((each) => {
      if (each.type === element.type) {
        return true;
      } else {
        return false;
      }
    });
    console.log(index);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const getUniqueCategories = (arr) => {
    let uniques = [];
    arr.forEach((element) => {
      if (checkExist(uniques, element)) {
        uniques.push(element);
      }
    });
    return uniques;
  };

  const getTabData = () => {
    const filteredArray = answerArray.filter(
      (each) => each.type === selectedTab
    );
    // console.log(filteredArray);
    if (filteredArray[0].type !== categoryList[2].name) {
      return (
        <div className="data-list-container-1">
          {filteredArray.map((each) => {
            const classArray = [
              "box-1",
              "box-2",
              "box-3",
              "box-4",
              "box-5",
              "box-6",
              "box-7",
            ];
            let boxClass =
              classArray[Math.floor(Math.random() * classArray.length)];
            return (
              <li key={each.id} className="list-item-1">
                <div className={`circle-box ${boxClass}`}>
                  {each.title.substr(0, 1).toUpperCase()}
                </div>

                <span className="list-item-1-text">{each.title}</span>
              </li>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="data-list-container-2">
          {filteredArray.map((each) => (
            <li key={each.id} className="list-item-2">
              <HiQuestionMarkCircle />
              <span className="question-text">{each.question}</span>
              <span className="new-tag-questions">new</span> >
            </li>
          ))}
        </div>
      );
    }
  };

  //   console.log(getUniqueCategories(answerArray));

  return (
    <div className="widget">
      <div className="widget-search-input-container">
        <button type="button" className="search-btn">
          Search
        </button>
        <input type="search" className="widget-search-input" />
      </div>

      <div className="category-list-container">
        {categoryList.map((each) => (
          <li
            className={`category-item ${
              each.name === selectedTab ? "active-category" : ""
            }`}
            onClick={() => ShiftTab(each.name)}
          >
            {each.name}
          </li>
        ))}
      </div>
      {getTabData()}
    </div>
  );
};

export default Widget;
