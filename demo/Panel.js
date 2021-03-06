import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import Icon from './Icon';
import {toCamelCase} from '../site/lib/utils';

class Panel extends React.Component {
  state = {
    open: this.props.open,
  };

  onClick = () => {
    const {category} = this.props;
    const openStatusObj = JSON.parse(sessionStorage.getItem('openStatus')) || {};
    Object.assign(openStatusObj, {[category.name]: !this.state.open});
    sessionStorage.setItem('openStatus', JSON.stringify(openStatusObj));
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const {category, components} = this.props;

    return (
      <div className="page-module-list__item--wrapper">
        <div className="page-module-list__item" onClick={this.onClick}>
          <div className="page-module-list__icon">
            <div>
              <img src={category.icon} alt="" />
            </div>
          </div>
          <div className="page-module-list__info">
            <div className="page-module-list__info__title">{category.label}</div>
            <div className="page-module-list__info__desc">{category.desc}</div>
          </div>
          <div className="page-module-list__arrow">
            <Icon type={this.state.open ? 'open_icon' : 'close_icon'} />
          </div>
        </div>
        <ul className={classNames({open: this.state.open})}>
          {Array.isArray(components)
            ? components
                .filter(com => com.category === category.name)
                .map((component, index) => (
                  <li key={index}>
                    <Link to={`/component/${component.name}`} key={index}>
                      <div>
                        <i className="indexicon" />
                        <span style={{color: '#6a6a77'}}>
                          {toCamelCase(component.name)} {component.title}
                        </span>
                        <s />
                      </div>
                    </Link>
                  </li>
                ))
            : Object.keys(components)
                .filter(componentName => components[componentName].category === category.name)
                .map((componentName, index) => {
                  const component = components[componentName];
                  return (
                    <li key={index}>
                      <Link to={`/component/${componentName}`} key={index}>
                        <div>
                          <i className="indexicon" />
                          <span style={{color: '#6a6a77'}}>
                            {toCamelCase(componentName)} {component.title}
                          </span>
                          <s />
                        </div>
                      </Link>
                    </li>
                  );
                })}
        </ul>
      </div>
    );
  }
}

export default Panel;
