const Checkbox = ({ type, label, name, onChange, queryTags }) => (
	<label htmlFor={label+'-'+name} className={`cursor-pointer checkbox ${type ? 'checkbox--'+type : ''}`}>
		<input checked={queryTags?.includes(name)} className="hidden cursor-pointer" name={name} onChange={onChange} type="checkbox" id={label+'-'+name} />
		<span className="checkbox__check cursor-pointer"></span>
    	<p>{label}</p>
	</label>
);
  
export default Checkbox;