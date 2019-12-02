'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.state = {
            options: []
        };
        _this.validate = _this.validate.bind(_this);
        _this.removeAll = _this.removeAll.bind(_this);
        _this.randomPick = _this.randomPick.bind(_this);
        _this.removeOption = _this.removeOption.bind(_this);
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'validate',
        value: function validate(option) {
            if (!option) {
                return 'Please Input a valid Option';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'Entry already in options';
            }

            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat([option])

                };
            });
            //console.log(this.state.options)
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            console.log(this.state.options);
            this.setState(function () {
                return {
                    options: []
                };
            });
        }
    }, {
        key: 'removeOption',
        value: function removeOption(option) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (item) {
                        return item !== option;
                    })
                };
            });
        }
    }, {
        key: 'randomPick',
        value: function randomPick() {
            var i = Math.floor(Math.random() * this.state.options.length);
            alert(this.state.options[i]);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            try {
                console.log('Fetching Data');
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // Do Nothing at All
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                console.log('Saving Data');
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'p-3' },
                React.createElement(Header, null),
                React.createElement(Options, {
                    options: this.state.options,
                    hasOptions: this.state.options.length > 0,
                    removeOption: this.removeOption
                }),
                React.createElement(Actions, { hasOptions: this.state.options.length > 0,
                    removeAll: this.removeAll,
                    randomPick: this.randomPick }),
                React.createElement(Form, { validate: this.validate })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Indecision App'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        !props.hasOptions && React.createElement(
            'p',
            null,
            'Please Add Options'
        ),
        props.options.map(function (item) {
            return React.createElement(Option, {
                OptionText: item,
                key: item,
                removeOption: props.removeOption
            });
        })
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.OptionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.removeOption(props.OptionText);
                }, className: 'btn btn-outline-secondary' },
            'Remove'
        )
    );
};

var Actions = function Actions(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !props.hasOptions, onClick: props.randomPick, className: 'btn btn-outline-secondary mr-1' },
            'What Should I Do'
        ),
        React.createElement(
            'button',
            { onClick: props.removeAll, className: 'btn btn-outline-secondary' },
            'Remove All'
        )
    );
};

var Form = function (_React$Component2) {
    _inherits(Form, _React$Component2);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this2 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this2.state = {
            error: undefined
        };
        _this2.validate = _this2.validate.bind(_this2);
        return _this2;
    }

    _createClass(Form, [{
        key: 'validate',
        value: function validate(e) {
            e.preventDefault();
            var option = e.target.elements.option.value;
            var error = this.props.validate(option);
            this.setState(function () {
                return { error: error };
            });
            e.target.elements.option.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.validate },
                    React.createElement('input', { type: 'text', name: 'option', className: 'input-size mr-1' }),
                    React.createElement(
                        'button',
                        { className: 'btn btn-outline-secondary' },
                        'Add Option'
                    ),
                    this.state.error && React.createElement(
                        'p',
                        null,
                        this.state.error
                    )
                )
            );
        }
    }]);

    return Form;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.querySelector('#app'));
