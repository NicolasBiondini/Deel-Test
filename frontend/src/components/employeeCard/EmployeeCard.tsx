import "./EmployeeCard.css";

import chatImage from "../../resources/chat.svg";
import workImage from "../../resources/work.svg";

type Props = {
  employee: employee;
};

const EmployeeCard = ({ employee }: Props) => {
  const { first_name, last_name, email, company, avatar } = employee;

  return (
    <div className="employeeCard-Container" data-testid="employee-Card">
      <div className="name-Container">
        <img alt="avatar" className="avatar-Container" src={avatar} />
        <p>
          {first_name} {last_name}
        </p>
      </div>
      <p className="data-Container">
        <span>
          <img alt="email" className="icon-Container" src={chatImage} />
        </span>
        {email}
      </p>
      <p className="data-Container">
        <span>
          <img alt="work" className="icon-Container" src={workImage} />
        </span>
        Working on: <span className="bolder">{company}</span>
      </p>
    </div>
  );
};

export default EmployeeCard;
