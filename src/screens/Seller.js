import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Seller = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [step, setStep] = useState(1);
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPricePerDay, setProductPricePerDay] = useState('');
  const [isProductValid, setIsProductValid] = useState(false);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleProductChange = () => {
    const isValidProductName = productName.length >= 3;
    const isValidProductDescription = productDescription.length > 0;
    const isValidProductPrice = !isNaN(productPricePerDay) && productPricePerDay > 0;
    const isValidProductImage = productImage.trim().length > 0;

    setIsProductValid(isValidProductName && isValidProductDescription && isValidProductPrice && isValidProductImage);
  };

  const handleNextStep = () => {
    if (step === 1 && category) {
      setStep(2);
    } else if (step === 2 && isProductValid) {
      setStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName: category,
        name: productName,
        img: productImage,
        description: productDescription,
        price: productPricePerDay,
      }),
    });

    if (response.ok) {
      navigate('/home');
    } else {
      alert('Failed to add product.');
    }
  };

  const allCategories = [
    'Equipment and Tools',
    'Transportation',
    'Event and Party Supplies',
    'Recreation and Leisure',
    'Home and Lifestyle',
    'Fashion and Accessories',
    'Specialty Items',
    'Land and Property Area',
  ];

  return (
    <>
      <Navbar />
      <Container>
        <RightPane>
          <Form>
            <Logo>
              <LogoImage src="../ecomlogo.png" alt="Logo" />
              <Heading>RentEase</Heading>
            </Logo>

            <ProgressBar>
              <ProgressStep className={step >= 1 ? "completed" : ""}></ProgressStep>
              <ProgressStep className={step >= 2 ? "completed" : ""}></ProgressStep>
              <ProgressStep className={step >= 3 ? "completed" : ""}></ProgressStep>
            </ProgressBar>
            {step === 1 && (
              <>
                <h2>Step 1: What do you sell?</h2>
                <Label>What do you sell?</Label>
                <CategoryContainer>
                  {allCategories.map((cat) => (
                    <CategoryButton
                      key={cat}
                      selected={category === cat}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </CategoryButton>
                  ))}
                </CategoryContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button onClick={handlePreviousStep} disabled={true}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} style={{ marginLeft: '10px' }}>
                    Save and Continue
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2>Step 2: Product Details</h2>
                <Label>Product Details</Label>
                <InputContainer>
                  <Input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    onBlur={handleProductChange}
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    type="text"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    placeholder="Product Image URL"
                    onBlur={handleProductChange}
                  />
                </InputContainer>
                <InputContainer>
                  <TextArea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Product Description"
                    onBlur={handleProductChange}
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    type="number"
                    value={productPricePerDay}
                    onChange={(e) => setProductPricePerDay(e.target.value)}
                    placeholder="Price Per Day in $"
                    onBlur={handleProductChange}
                  />
                </InputContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button className={!isProductValid ? 'disabled' : ''} disabled={!isProductValid} onClick={handleNextStep}>
                    Save and Continue
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </Form>
        </RightPane>
      </Container>
    </>
  );
};

export default Seller;

const Container = styled.div`
  display: flex;
  height: 88.5vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  font-family: 'Roboto', sans-serif;
  padding: 20px;
`;

const RightPane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
`;

const Form = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const ProgressStep = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ddd;
  border-radius: 50%;
  &.completed {
    background-color: #4caf50;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100px;
`;

const Domain = styled.span`
  margin-left: -10px;
  font-size: 0.9em;
  color: #ffffff;
`;

const ValidCheck = styled.span`
  color: #4caf50;
  margin-left: 10px;
`;

const ValidationRules = styled.div`
  margin: 10px 0;
  font-size: 1.2em;
`;

const Label = styled.label`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const Button = styled.button`
  background-color: #6a1b9a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  &.disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const InfoText = styled.p`
  margin-top: 10px;
  font-size: 0.9em;
  color: #ffffff;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-style: normal;
`;

const Logo = styled.div`
  font-size: 10rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 1rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => (props.selected ? '#6a1b9a' : '#f1f1f1')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #6a1b9a;
    color: #fff;
  }
`;

