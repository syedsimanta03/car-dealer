import React from 'react'
import CKEditor from 'react-ckeditor-component';
import {  Mutation } from 'react-apollo';
import {
  UPDATE_USER_CAR
} from '../../queries';

 const EditCarModal = ({
   handleSubmit,
   handleEditorChange,
   car,
   handleChange,
   closeModal
 }) => (
   <Mutation
     mutation={UPDATE_USER_CAR}
     variables={{
       _id: car._id,
       name: car.name,
       imageUrl: car.imageUrl,
       category: car.category,
       description: car.description
     }}
   >
     {updateUserCar => (
       <React.Fragment>
         <div className='container my-5'>
           <div className='card'>
             <h5 className='card-header info-color white-text text-center py-4'>
               <strong className='text-center'>EDIT YOUR CAR</strong>
             </h5>
             <div className='card-body px-lg-5 pt-0'>
               <form
                 className='md-form'
                 onSubmit={event => handleSubmit(event, updateUserCar)}
                 style={{ color: '#757575' }}
               >
                 <input
                   type='text'
                   id='input'
                   className='form-control'
                   placeholder='Car Name'
                   name='name'
                   value={car.name}
                   onChange={handleChange}
                 />
                 <input
                   type='number'
                   id='input'
                   className='form-control'
                   placeholder='Car Price'
                   name='price'
                   value={car.price}
                   onChange={handleChange}
                 />
                 <input
                   type='number'
                   id='input'
                   className='form-control'
                   placeholder='Rate condition out of 5(INT)'
                   name='rating'
                   value={car.rating}
                   onChange={handleChange}
                 />
                 <input
                   type='text'
                   id='input'
                   className='form-control'
                   placeholder='Image URL'
                   name='imageUrl'
                   value={car.imageUrl}
                   onChange={handleChange}
                 />
                 <div>
                   <select
                     className='mdb-select md-form mb-4 initialized'
                     id='select'
                     name='category'
                     value={car.category}
                     onChange={handleChange}
                   >
                     <option value disabled selected>
                       Choose your category
                     </option>
                     <option value='Sedan'>Sedan</option>
                     <option value='Truck'>Truck</option>
                     <option value='Sports'>Sports</option>
                   </select>
                 </div>
                 <textarea
                   className='form-control md-textarea'
                   id='textarea'
                   placeholder='Car Description'
                   name='description'
                   value={car.description}
                   onChange={handleChange}
                 />
                 <input
                   type='text'
                   id='input'
                   className='form-control'
                   placeholder='Mileages'
                   name='mileages'
                   value={car.mileages}
                   onChange={handleChange}
                 />
                 <CKEditor
                   name='features'
                   content={car.features}
                   events={{ change: handleEditorChange }}
                 />
                 <div className='row mt-5 justify-content-between align-items-center'>
                   <button type='submit' className='btn-primary b-fix'>
                     Update
                   </button>
                   <button className='btn-danger b-fix' onClick={closeModal}>
                     Cancel
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </React.Fragment>
     )}
   </Mutation>
 );


export default EditCarModal
