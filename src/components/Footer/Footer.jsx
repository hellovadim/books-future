import "./Footer.scss"

export const Footer = () => {
  const year = new Date().getFullYear()
  return(
    <div className="footer">
      <span>Create by Vadim {year}</span>
    </div>
  )
}