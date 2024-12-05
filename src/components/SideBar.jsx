import React from 'react'

const SideBar = () => {
  return (
	<div className='w-64 bg-gray-800 fixed h-full px-4 py-2'>
	  <div className='my-2 mb-4'>
		<h1 className='text-2xl text-white font-bold '>Admin Dashboard</h1>
	  </div>
	  <hr/>
	  <ul className='mt-3 text-white font-bold'>
		<li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
			<a href="" className='px-3'>
				Ganeshram
			</a>
		</li>
		<li>
			<a href="">
				<></>
			</a>
		</li>
		<li>
			<a href="">
				<></>
			</a>
		</li>
		
	  </ul>

	</div>
  )
}

export default SideBar
