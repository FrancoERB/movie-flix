const Avatar = ({avatarName}) => {

const getInitialsAvatarLetters = () => (
    avatarName.split(' ')
    .map(letra => letra.charAt(0).toUpperCase())
    .join('')
)
    return(
        <div className='inline-flex sm:opacity-0 md:opacity-100 lg:opacity-100 items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full'>
            <span 
                className="font-black text-xl text-gray-600 ">
                {getInitialsAvatarLetters()}
            </span>
        </div>
    )
}
export default Avatar;