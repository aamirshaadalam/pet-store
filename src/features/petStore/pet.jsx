import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPetById } from './petSlice';
import { useDispatch } from 'react-redux';
import '../../styles/pet.scss';

export default function Pet() {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const [pet, setPet] = useState({});

  useEffect(() => {
    if (petId && !isNaN(parseInt(petId, 10)))
      dispatch(fetchPetById(petId)).then((response) => {
        setPet(response.payload.data);
      });
  }, [dispatch, petId]);

  return (
    <div className='pet-container'>
      <img src={pet.url} alt={pet.name} />
      <div className='pet-description'>
        <h2>{pet.name}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum quis ipsum id pellentesque. Aenean
          accumsan, quam in aliquet luctus, ligula nisl venenatis orci, eu rhoncus lacus odio vel libero.
        </p>
      </div>
    </div>
  );
}
