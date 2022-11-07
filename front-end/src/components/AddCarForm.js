import {
  EuiButton,
  EuiFieldNumber,
  EuiFieldText,
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSwitch,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MyLoader } from "./MyLoader";
import { WysiwygEditor } from "./WysiwygEditor";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const AddCarForm = ({ getData, closeFlyOut, show }) => {
  const [carName, setCarName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [features, setFeatures] = useState({});
  const [editorState, setEditorState] = useState();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addFeature = (feature) => {
    setFeatures((state) => {
      return { ...state, ...feature };
    });
  };

  const [modelError, setModelError] = useState(false);

  const listOfFeatures = ["AC", "PowerSteering"];

  const addNewCar = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cars/add`,
        {
          name: carName,
          make: make,
          prodYear: model,
          features: features,
          richText: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }
      );

      if (response.status !== 201) {
        setError("There was a network error");
        setLoading(false);
        return;
      }

      closeFlyOut();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      getData();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (model.length < 4 || model > new Date().getFullYear()) {
      setModelError(true);
      return;
    }

    setModelError(false);
    addNewCar();
  };

  return (
    <>
      {loading ? (
        <MyLoader />
      ) : (
        <EuiForm
          onSubmit={submitHandler}
          component="form"
          className="addCarForm"
        >
          <EuiFormRow fullWidth label="Car Name">
            <EuiFieldText
              required
              fullWidth
              placeholder="e.g Civic"
              value={carName}
              onChange={(e) => {
                setCarName(e.target.value);
              }}
            />
          </EuiFormRow>
          <EuiFormRow fullWidth label="Make">
            <MakersDropDown setMake={setMake} make={make} />
            {/* <EuiFieldText
              fullWidth
              placeholder="e.g Honda"
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
              }}
            /> */}
          </EuiFormRow>
          <EuiFormRow
            error={[`Model Should be between 0000-${new Date().getFullYear()}`]}
            isInvalid={modelError}
            fullWidth
            label="Model"
          >
            <EuiFieldNumber
              fullWidth
              placeholder="e.g 2021"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
          </EuiFormRow>
          <EuiFormRow fullWidth label="Features">
            <EuiFlexGroup>
              {listOfFeatures.map((item, index) => (
                <MySwitchElement
                  key={index}
                  addFeature={addFeature}
                  label={item}
                />
              ))}
            </EuiFlexGroup>
          </EuiFormRow>
          <EuiFormRow fullWidth>
            <WysiwygEditor
              show={show}
              setEditorState={setEditorState}
              editorState={editorState}
            />
          </EuiFormRow>
          <EuiFormRow fullWidth>
            <EuiButton type="submit" fullWidth>
              Submit
            </EuiButton>
          </EuiFormRow>
          {error && (
            <EuiFormRow fullWidth>
              <EuiText>
                <p>
                  <EuiTextColor color={"danger"}>{error}</EuiTextColor>
                </p>
              </EuiText>
            </EuiFormRow>
          )}
        </EuiForm>
      )}
    </>
  );
};

const MySwitchElement = ({ label, addFeature }) => {
  const [value, setValue] = useState(false);

  return (
    <EuiSwitch
      label={label}
      checked={value}
      value={value}
      onChange={(e) => {
        setValue(e.target.checked);
        const temp = {};
        temp[label] = e.target.checked;
        addFeature(temp);
      }}
    />
  );
};

const MakersDropDown = ({ make, setMake }) => {
  const [data, setData] = useState([]);

  const getMakes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/makers`
      );

      const options = [];

      response.data.forEach((item) => {
        options.push({ value: item.name, text: item.name });
      });

      setData(options);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMakes();
  }, []);

  const _options = [{ value: "Loading", text: "Loading.." }];

  const onChange = (e) => {
    setMake(e.target.value);
  };

  return (
    <EuiSelect
      placeholder="Select Make"
      fullWidth
      options={data ? data : _options}
      value={make}
      onChange={(e) => onChange(e)}
    />
  );
};
