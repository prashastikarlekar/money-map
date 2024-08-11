const GridBackground = ({ children }) => {
	return (
		// <div className='absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>
		// <div className='bg-[#f5f4f1]'>
		// <div class='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1.6px,transparent_1.6px)] [background-size:16px_16px]'>
		<div className='relative h-full w-full bg-[#f5f4f1]'>
			<div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
			{children}
		</div>
	);
};
export default GridBackground;
