
const GlassCard = ({ children, className, ...props }) => {
    return (
        <div className={`rounded-xl bg-black bg-opacity-15 backdrop-blur-lg border-[1px] border-gray-700 border-opacity-30 ${className}`} {...props}>
            {children}
        </div>
    )
}

export default GlassCard;